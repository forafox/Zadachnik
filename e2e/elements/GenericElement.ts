import {Locator, Page} from "@playwright/test";

export class GenericElement {
  constructor(protected readonly page: Page, protected readonly locator: Locator, protected readonly positive: boolean = true) {
  }
}
