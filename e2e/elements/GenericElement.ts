import { expect, Locator, Page } from "@playwright/test";

export class GenericElement {
  constructor(
    protected readonly page: Page,
    protected readonly locator: Locator,
    protected readonly positive: boolean = true,
  ) {}

  async shouldBeVisible() {
    if (this.positive) {
      await expect(this.locator).toBeVisible();
    } else {
      await expect(this.locator).not.toBeVisible();
    }
  }

  get not() {
    const Class = this.constructor as typeof GenericElement;

    return new Class(this.page, this.locator, !this.positive);
  }
}
