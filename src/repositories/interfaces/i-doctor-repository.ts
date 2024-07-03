import { Doctor, Prisma } from '@prisma/client';

export interface DoctorRepository {
  findAll(): Promise<Doctor[] | []>;
  findById(id: string): Promise<DoctorAndAppointments | null>;
}
export type DoctorAndAppointments = Prisma.DoctorGetPayload<{
  include: {
    MedicalAppointment: true;
  };
}>;
