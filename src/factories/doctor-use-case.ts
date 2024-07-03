import { DoctorProfileUseCase } from '@/model/list-doctors';
import { PrismaDoctorRepository } from '@/repositories/doctor-repository';

export function makeDoctorUseCase() {
  const doctorRepository = new PrismaDoctorRepository();
  const doctorUseCase = new DoctorProfileUseCase(doctorRepository);
  return doctorUseCase;
}
