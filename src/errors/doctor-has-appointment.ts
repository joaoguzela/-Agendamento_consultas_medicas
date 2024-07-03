export class UserAlreadyExistsError extends Error {
  constructor() {
    super('This doctor already has a scheduled appointment at this time.');
  }
}
