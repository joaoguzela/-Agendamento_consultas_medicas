/* eslint-disable @typescript-eslint/no-shadow */
import { DoctorNotExistsError } from '@/errors/doctor-not-exist';
import { DoctorsWorkingHoursError } from '@/errors/doctors-working-hours';
import { HasHolidayError } from '@/errors/has-holidays';
import { DoctorRepository } from '@/repositories/interfaces/i-doctor-repository';
import { MedicalAppointmentRepository } from '@/repositories/interfaces/i-medical-appointment-repository';
import { MedicalAppointment } from '@prisma/client';
import Holidays from 'date-holidays';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

interface MedicalAppointmentUseCaseRequest {
  patient_id: string;
  doctor_id: string;
  date_appointment: Date;
}
interface MedicalAppointmentUseCaseResponse {
  medicalAppointment: MedicalAppointment;
}

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('America/Sao_Paulo');

export class MedicalAppointmentUseCase {
  constructor(
    private prismaMedicalAppointmentRepository: MedicalAppointmentRepository,
    private prismaDoctorRepository: DoctorRepository,
  ) {}

  async execute({
    patient_id,
    doctor_id,
    date_appointment,
  }: MedicalAppointmentUseCaseRequest): Promise<MedicalAppointmentUseCaseResponse> {
    const doctor = await this.prismaDoctorRepository.findById(doctor_id);

    if (!doctor) {
      throw new DoctorNotExistsError();
    }
    const holidays = new Holidays('BR');
    if (holidays.isHoliday(date_appointment)) {
      throw new HasHolidayError();
    }
    const appointmentHour = dayjs(date_appointment).utcOffset(0).hour();
    if (
      appointmentHour < Number(doctor.office_hour_start) ||
      appointmentHour >= Number(doctor.office_hour_end)
    ) {
      throw new DoctorsWorkingHoursError();
    }
    const hasAppointment = await this.prismaMedicalAppointmentRepository.findConflictingAppointment(
      doctor.id,
    );
    if (hasAppointment && hasAppointment?.length > 0) {
      for (const appointment of hasAppointment) {
        if (
          dayjs(appointment.date_appointment)
            .utcOffset(0)
            .isSame(dayjs(date_appointment).utcOffset(0))
        ) {
          throw new DoctorsWorkingHoursError();
        }
      }
    }

    const medicalAppointment = await this.prismaMedicalAppointmentRepository.create({
      date_appointment,
      doctor: { connect: { id: doctor_id } },
      patient: { connect: { id: patient_id } },
    });
    return { medicalAppointment };
  }
}
