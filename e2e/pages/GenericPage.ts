import { Page } from "@playwright/test";
import { Sidebar } from "../elements/Sidebar";

export class GenericPage {
  constructor(protected readonly page: Page) {}

  get sidebar() {
    return new Sidebar(this.page);
  }
}
