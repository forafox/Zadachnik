import { GenericPage } from "./GenericPage";
import { FormElement } from "../elements/FormElement";
import { TextInput } from "../elements/inputs/TextInput";

export class TeamsPage extends GenericPage {
  get team(): FormElement<{ title: string }> {
    return new FormElement<{ title: string }>(
      this.page,
      this.page.locator("form"),
      {
        title: (page, locator) => new TextInput(page, locator),
      },
    );
  }

  async goto() {
    this.page.goto("/teams");
  }
}
