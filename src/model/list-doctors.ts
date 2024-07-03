import { DoctorRepository } from '@/repositories/interfaces/i-doctor-repository';
import { Doctor } from '@prisma/client';

type ListDoctorUseCaseResponse = {
  doctors: Doctor[] | [];
};

export class DoctorProfileUseCase {
  constructor(private doctorRepository: DoctorRepository) {}

  async execute(): Promise<ListDoctorUseCaseResponse> {
    const doctors = await this.doctorRepository.findAll();

    return {
      doctors,
    };
  }
}
