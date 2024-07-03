import { MedicalAppointment, Prisma } from '@prisma/client';

export interface MedicalAppointmentRepository {
  create(data: Prisma.MedicalAppointmentCreateInput): Promise<MedicalAppointment>;
  findMedicalAppointmentByDoctorId(id: string): Promise<MedicalAppointment[] | []>;
  findConflictingAppointment(doctor_id: string): Promise<MedicalAppointment[] | null>;
}
