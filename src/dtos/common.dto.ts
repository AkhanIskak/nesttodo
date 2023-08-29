export class MessageResponse {
  message: string;
  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }
}
