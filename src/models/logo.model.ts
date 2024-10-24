export class Logo {
  id?: number;
  logoName?: string;
  logoDescription?: string;

  constructor({ id, logoName, logoDescription }) {
    if (id !== undefined) this.id = id;
    if (logoName !== undefined) this.logoName = logoName;
    if (logoDescription !== undefined) this.logoDescription = logoDescription;
  }
}
