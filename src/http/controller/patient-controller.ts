import { PatientNotExistsError } from '@/errors/patient-not-exist';
import { makePatientUseCase } from '@/factories/patient-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';

interface PatientControllerRequest {
  patientId: string;
}

export async function getPatient(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const { patientId } = request.params as PatientControllerRequest;

  try {
    const patientUseCase = makePatientUseCase();
    const result = await patientUseCase.execute({ patient_id: patientId });

    reply.status(200).send(result);
  } catch (error) {
    if (error instanceof PatientNotExistsError) {
      reply.status(404).send({ message: error.message });
    } else {
      reply.status(500).send({ error: 'Internal server error.' });
    }
  }
}
