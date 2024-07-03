import { PatientNotExistsError } from '@/errors/patient-not-exist';
import {
  PatientAndAppointments,
  PatientRepository,
} from '@/repositories/interfaces/i-patient-repository';

interface PatientUseCaseRequest {
  patient_id: string;
}
interface PatientUseCaseResponse {
  patient: PatientAndAppointments;
}

export class PatientUseCase {
  constructor(private prismaPatientRepository: PatientRepository) {}

  async execute({ patient_id }: PatientUseCaseRequest): Promise<PatientUseCaseResponse> {
    const patient = await this.prismaPatientRepository.findByPatientId(patient_id);

    if (!patient) {
      throw new PatientNotExistsError();
    }

    return {
      patient,
    };
  }
}
