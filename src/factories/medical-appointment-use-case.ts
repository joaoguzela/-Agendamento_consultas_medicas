import { MedicalAppointmentUseCase } from '@/model/create-medical-appointment';
import { PrismaDoctorRepository } from '@/repositories/doctor-repository';
import { PrismaMedicalAppointmentRepository } from '@/repositories/medical-appointment-repository';

export function makeMedicalAppointmentUseCase() {
  const medicalAppointmentRepository = new PrismaMedicalAppointmentRepository();
  const doctorRepository = new PrismaDoctorRepository();
  const medicalAppointmentUseCase = new MedicalAppointmentUseCase(
    medicalAppointmentRepository,
    doctorRepository,
  );
  return medicalAppointmentUseCase;
}
