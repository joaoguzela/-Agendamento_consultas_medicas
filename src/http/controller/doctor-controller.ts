import { DoctorNotExistsError } from '@/errors/doctor-not-exist';
import { makeDoctorGetUseCase, makeDoctorUseCase } from '@/factories/doctor-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

interface GetDoctorsControllerRequest {
  doctorId: string;
}

export async function listDoctors(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
  try {
    const doctorProfileUseCase = makeDoctorUseCase();
    const result = await doctorProfileUseCase.execute();
    reply.status(200).send(result);
  } catch (error) {
    reply.status(500).send({ error: 'Internal server error.' });
  }
}

export async function getDoctor(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const { doctorId } = request.params as GetDoctorsControllerRequest;

  try {
    const patientUseCase = makeDoctorGetUseCase();
    const result = await patientUseCase.execute({ doctorId });

    reply.status(200).send(result);
  } catch (error) {
    if (error instanceof DoctorNotExistsError) {
      reply.status(404).send({ message: error.message });
    } else {
      reply.status(500).send({ error: 'Internal server error.' });
    }
  }
}
