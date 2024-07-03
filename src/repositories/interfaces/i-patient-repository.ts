import { Prisma } from '@prisma/client';

export type PatientAndAppointments = Prisma.PatientGetPayload<{
  include: {
    MedicalAppointment: {
      include: {
        doctor: true;
      };
    };
  };
}>;

export interface PatientRepository {
  findByPatientId(patient_id: string): Promise<PatientAndAppointments | null>;
}
