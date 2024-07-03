export class DoctorNotExistsError extends Error {
  constructor() {
    super('Doctor not exists');
  }
}
