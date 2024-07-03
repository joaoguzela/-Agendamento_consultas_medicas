import { PatientUseCase } from '@/model/list-patient';
import { PrismaPatientRepository } from '@/repositories/patient-repository';

export function makePatientUseCase() {
  const patientRepository = new PrismaPatientRepository();
  const patientUseCase = new PatientUseCase(patientRepository);
  return patientUseCase;
}
