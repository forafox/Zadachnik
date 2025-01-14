import { Page } from "@playwright/test";
import { TextInput } from "../elements/inputs/TextInput";
import { FormElement } from "../elements/FormElement";

export class SignInPage {
  public readonly task: FormElement<{ username: string; password: string }>;

  constructor(protected readonly page: Page) {
    this.task = new FormElement(page, this.page.locator("form"), {
      username: (page, locator) => new TextInput(page, locator),
      password: (page, locator) => new TextInput(page, locator),
    });
  }

  async goto() {
    await this.page.goto("/sign-in");
  }
}
