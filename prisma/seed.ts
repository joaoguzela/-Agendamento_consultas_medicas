import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

async function seed() {
  try {
    const seedStatus = await prisma.seedStatus.findFirst();

    if (seedStatus?.has_run === true) {
      await prisma.$disconnect();
      throw new Error('⚠️ Database has already been seeded. Aborting...');
    }

    const patient = await prisma.patient.create({
      data: {
        cpf: '123456789001',
        name: 'João da Silva',
        date_of_birth: '1990-01-01',
      },
    });

    console.log('Paciente já existe no banco de dados.');

    const doctor = await prisma.doctor.create({
      data: {
        crm: '1234567',
        name: 'Dr. Pedro Oliveira',
        specialty: 'Cardiologia',
        office_hour_start: '8',
        office_hour_end: '18',
      },
    });

    await prisma.medicalAppointment.create({
      data: {
        date_appointment: dayjs('2024-07-02 10:00', 'YYYY-MM-DD HH:mm').toDate(),
        patient: { connect: { id: patient.id } },
        doctor: { connect: { id: doctor.id } },
      },
    });

    await prisma.seedStatus.create({ data: { has_run: true } });
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();
