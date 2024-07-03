export class DoctorNotScheduleDuringError extends Error {
  constructor() {
    super('The appointment must be scheduled during the doctors working hours.');
  }
}
