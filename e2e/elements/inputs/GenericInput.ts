import { GenericElement } from "../GenericElement";

export class GenericInput<T> extends GenericElement {
  async setValue(_: T) {
    throw new Error("setValue is not implemented");
  }

  async shouldBeValue(_: T) {
    throw new Error("shouldBeValue is not implemented");
  }
}
