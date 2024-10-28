export class Category {
  id?: number;
  categoryName?: string;
  categoryDescription?: string;

  constructor({ id, categoryName, categoryDescription }) {
    if (id !== undefined) this.id = id;
    if (categoryName !== undefined) this.categoryName = categoryName;
    if (categoryDescription !== undefined) this.categoryDescription = categoryDescription;
  }
}
