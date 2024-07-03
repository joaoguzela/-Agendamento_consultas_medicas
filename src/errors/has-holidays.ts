export class HasHolidayError extends Error {
  constructor() {
    super('You cannot make appointments on holidays.');
  }
}
