import { prisma } from '@/lib/prisma';
import { MedicalAppointment, Prisma } from '@prisma/client';
import { MedicalAppointmentRepository } from './interfaces/i-medical-appointment-repository';

export class PrismaMedicalAppointmentRepository implements MedicalAppointmentRepository {
  async create(data: Prisma.MedicalAppointmentCreateInput): Promise<MedicalAppointment> {
    const medicalAppointment = await prisma.medicalAppointment.create({
      data,
    });
    return medicalAppointment;
  }

  async findMedicalAppointmentByDoctorId(id: string): Promise<MedicalAppointment[] | []> {
    const medicalAppointment = await prisma.medicalAppointment.findMany({
      where: {
        doctor_id: id,
      },
    });
    if (!medicalAppointment) return [];
    return medicalAppointment;
  }

  async findConflictingAppointment(doctor_id: string): Promise<MedicalAppointment[] | null> {
    return prisma.medicalAppointment.findMany({
      where: {
        doctor_id,
      },
    });
  }
}
