import { makeDoctorUseCase } from '@/factories/doctor-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function listDoctors(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
  try {
    const doctorProfileUseCase = makeDoctorUseCase();
    const result = await doctorProfileUseCase.execute();
    reply.status(200).send(result);
  } catch (error) {
    reply.status(500).send({ error: 'Internal server error.' });
  }
}
