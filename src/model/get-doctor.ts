import { DoctorNotExistsError } from '@/errors/doctor-not-exist';
import {
  DoctorAndAppointments,
  DoctorRepository,
} from '@/repositories/interfaces/i-doctor-repository';

interface DoctorUseCaseRequest {
  doctorId: string;
}

interface DoctorUseCaseResponse {
  doctor: DoctorAndAppointments;
}
export class DoctorGetUseCase {
  constructor(private prismaDoctorRepository: DoctorRepository) {}

  async execute({ doctorId }: DoctorUseCaseRequest): Promise<DoctorUseCaseResponse> {
    const doctor = await this.prismaDoctorRepository.findById(doctorId);

    if (!doctor) {
      throw new DoctorNotExistsError();
    }

    return {
      doctor,
    };
  }
}
