export class ResourceNotFound extends Error {
  constructor() {
    super('Resource Not Found');
    this.name = 'Resource Not Found';
  }
}
