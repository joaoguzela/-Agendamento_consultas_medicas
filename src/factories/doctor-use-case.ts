import { DoctorGetUseCase } from '@/model/get-doctor';
import { DoctorProfileUseCase } from '@/model/list-doctors';
import { PrismaDoctorRepository } from '@/repositories/doctor-repository';

export function makeDoctorUseCase() {
  const doctorRepository = new PrismaDoctorRepository();
  const doctorUseCase = new DoctorProfileUseCase(doctorRepository);
  return doctorUseCase;
}

export function makeDoctorGetUseCase() {
  const doctorRepository = new PrismaDoctorRepository();
  const doctorUseCase = new DoctorGetUseCase(doctorRepository);
  return doctorUseCase;
}
