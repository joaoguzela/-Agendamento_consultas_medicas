import { getDoctor, listDoctors } from '@/http/controller/doctor-controller';
import { createMedicalAppointment } from '@/http/controller/medical-appointment-controller';
import { getPatient } from '@/http/controller/patient-controller';
import { FastifyInstance } from 'fastify';

export async function appRoutes(app: FastifyInstance) {
  app.post('/appointment', createMedicalAppointment);
  app.get('/patients/:patientId', getPatient);
  app.get('/doctors', listDoctors);
  app.get('/doctors/:doctorId', getDoctor);
}
