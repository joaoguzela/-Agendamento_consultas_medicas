import { Doctor } from '@prisma/client';

export interface DoctorRepository {
  findAll(): Promise<Doctor[] | []>;
  findById(id: string): Promise<Doctor | null>;
}
