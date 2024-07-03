import { prisma } from '@/lib/prisma';
import {
  PatientAndAppointments,
  PatientRepository,
} from '@/repositories/interfaces/i-patient-repository';

export class PrismaPatientRepository implements PatientRepository {
  async findByPatientId(patient_id: string): Promise<PatientAndAppointments | null> {
    const patient = await prisma.patient.findUnique({
      where: {
        id: patient_id,
      },
      include: {
        MedicalAppointment: {
          include: {
            doctor: true,
          },
        },
      },
    });
    return patient;
  }
}
