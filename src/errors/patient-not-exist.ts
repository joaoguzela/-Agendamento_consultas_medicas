export class PatientNotExistsError extends Error {
  constructor() {
    super('Patient not exists');
  }
}
