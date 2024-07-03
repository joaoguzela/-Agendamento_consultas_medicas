export class DoctorsWorkingHoursError extends Error {
  constructor() {
    super('This doctor is not available for appointments at these times.');
  }
}
