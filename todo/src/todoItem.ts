export class TodoItem {

  public constructor(
    public id: number,
    public task: string,
    public complete: boolean = false) {
      // implicit field assignment
  }

  public printDetails() : void {
    console.log(`${this.id}\t${this.task} ${this.complete ? "\t(complete)": ""}`);
  }
}
