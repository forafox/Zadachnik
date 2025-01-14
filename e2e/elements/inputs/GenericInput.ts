import { GenericElement } from "../GenericElement";

export class GenericInput<T> extends GenericElement {
  async setValue(value: T) {
    throw new Error("setValue is not implemented");
  }

  async shouldBeValue(value: T) {
    throw new Error("shouldBeValue is not implemented");
  }
}
