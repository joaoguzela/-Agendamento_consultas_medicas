import { prisma } from '@/lib/prisma';
import { Doctor } from '@prisma/client';
import { DoctorAndAppointments, DoctorRepository } from './interfaces/i-doctor-repository';

export class PrismaDoctorRepository implements DoctorRepository {
  async findAll(): Promise<Doctor[] | []> {
    const doctor = await prisma.doctor.findMany({});
    return doctor;
  }

  async findById(id: string): Promise<DoctorAndAppointments | null> {
    const doctor = await prisma.doctor.findUnique({
      where: {
        id,
      },
      include: {
        MedicalAppointment: true,
      },
    });
    return doctor;
  }
}
