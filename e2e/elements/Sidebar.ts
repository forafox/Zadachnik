import { Page } from "@playwright/test";
import { GenericElement } from "./GenericElement";
import { ButtonElement } from "./ButtonElement";
import { LinkElement } from "./LinkElement";

class SidebarBlock extends GenericElement {
  get create() {
    return new ButtonElement(
      this.page,
      this.page.getByTestId("create"),
      this.positive,
    );
  }
}

class SidebarTeamEntry extends GenericElement {
  get meetings() {
    return new LinkElement(this.page, this.locator.getByTestId("meetings"));
  }

  get sprints() {
    return new LinkElement(this.page, this.locator.getByTestId("sprints"));
  }

  public activate() {
    return this.locator.locator("a[data-sidebar=menu-button]").click();
  }
}

class SidebarTeamBlock extends SidebarBlock {
  get(name: string) {
    return new SidebarTeamEntry(
      this.page,
      this.locator.locator("[data-sidebar=menu]", { hasText: name }),
    );
  }
}

export class Sidebar {
  constructor(protected page: Page) {}

  get locator() {
    return this.page.getByTestId("sidebar");
  }

  get teams() {
    return new SidebarTeamBlock(this.page, this.locator.getByTestId("teams"));
  }
}
