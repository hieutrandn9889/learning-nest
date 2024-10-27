export class ModelCar {
  id?: number;
  modelCarName?: string;
  modelCarDescription?: string;

  constructor({ id, modelCarName, modelCarDescription }) {
    if (id !== undefined) this.id = id;
    if (modelCarName !== undefined) this.modelCarName = modelCarName;
    if (modelCarDescription !== undefined) this.modelCarDescription = modelCarDescription;
  }
}
