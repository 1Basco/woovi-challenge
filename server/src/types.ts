export class IUser {
  id: string;
  name: string;
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
  }
}

export class Ideia {
  id: string;
  IuserId: string;
  ideaText: string;
  constructor(data) {
    this.id = data.id;
    this.ideaText = data.ideaText;
  }
}
