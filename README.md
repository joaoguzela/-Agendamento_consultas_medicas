# Stations Doctor - Sistema de Agendamento de Consultas Médicas

Bem-vindo ao Stations Doctor, um sistema de controle de consultas médicas desenvolvido em TypeScript e Node.js. Este projeto visa oferecer uma solução robusta para gerenciar consultas em um consultório médico.

## Funcionalidades Implementadas

1. **Listagem de Médicos Disponíveis**
   - Exibe informações como nome, CRM e especialidade dos médicos disponíveis para consulta.

2. **Cadastro de Consulta**
   - Permite agendar uma consulta, validando se o horário está dentro do expediente do médico e se não há conflito com outras consultas já agendadas.

3. **Listagem de Consultas por Médico**
   - Mostra as consultas agendadas para um médico específico, incluindo informações sobre o paciente, data e horário da consulta.

4. **Listagem de Consultas por Paciente**
   - Exibe as consultas agendadas para um paciente específico, mostrando informações sobre o médico, data e horário da consulta.

## Detalhes das Entidades

- **Paciente**
  - Atributos: nome, CPF, data de nascimento.

- **Médico**
  - Atributos: nome, CRM (Cadastro de Registro Médico), especialidade.

- **Consulta**
  - Atributos: paciente, médico, data e horário da consulta.

## Requisitos Técnicos

Para rodar o projeto, certifique-se de ter:

- Node.js instalado na sua máquina.
- Docker instalado para usar o Docker Compose.
- Banco de dados PostgreSQL configurado via Docker Compose.

## Configuração e Uso

1. **Instalação das Dependências**
   ```bash
   npm install
   ```
## Execução do Seed

Antes de iniciar o sistema pela primeira vez, execute o seed para criar registros iniciais de pacientes, médicos e consultas.

```bash
npm run seed
```
## Inicialização do Servidor
```bash
npm start:dev
```
O servidor estará disponível em http://localhost:3000

## Docker Compose para Banco de Dados

```bash
docker-compose up -d
```
## Rotas da API

- **GET \`/doctors\`**: Lista todos os médicos disponíveis.
- **POST \`/appointments\`**: Cadastra uma nova consulta.
- **GET \`/doctors/:doctorId`**: Lista as consultas agendadas para um médico específico.
- **GET \`/api/patients/:patientId\`**: Lista as consultas agendadas para um paciente específico.

## Tecnologias Utilizadas

- TypeScript
- Node.js
- Express.js
- Prisma (ORM)
- PostgreSQL

Com o Stations Doctor, você tem uma solução completa para gerenciar consultas médicas de forma eficiente e organizada. Explore as funcionalidades e aproveite para melhorar o atendimento no seu consultório! 🏥💉✨