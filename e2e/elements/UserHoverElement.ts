import { GenericElement } from "./GenericElement";
import { expect } from "@playwright/test";

export class UserHoverElement extends GenericElement {
  async shouldBe(username: string) {
    await expect(this.locator).toHaveAttribute("data-value", username);
  }
}
