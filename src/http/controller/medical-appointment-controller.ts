import { DoctorNotExistsError } from '@/errors/doctor-not-exist';
import { DoctorsWorkingHoursError } from '@/errors/doctors-working-hours';
import { HasHolidayError } from '@/errors/has-holidays';
import { makeMedicalAppointmentUseCase } from '@/factories/medical-appointment-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createMedicalAppointment(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<Response> {
  const medicalAppointmentBodySchema = z.object({
    patientId: z.string(),
    doctorId: z.string(),
    dateAppointment: z.string().transform((string_) => new Date(string_)),
  });

  const { patientId, doctorId, dateAppointment } = medicalAppointmentBodySchema.parse(request.body);
  const useCase = makeMedicalAppointmentUseCase();
  try {
    const result = await useCase.execute({
      patient_id: patientId,
      date_appointment: dateAppointment,
      doctor_id: doctorId,
    });

    return reply.status(200).send(result);
  } catch (error) {
    switch (true) {
      case error instanceof DoctorNotExistsError:
        return reply.status(404).send({ message: error.message });

      case error instanceof HasHolidayError:
      case error instanceof DoctorsWorkingHoursError:
        return reply.status(403).send({ message: error.message });

      default:
        return reply.status(500).send({ error: 'Internal server error.' });
    }
  }
}
