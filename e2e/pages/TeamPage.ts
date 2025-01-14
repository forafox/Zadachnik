import { GenericPage } from "./GenericPage";
import { GenericElement } from "../elements/GenericElement";
import { UserHoverElement } from "../elements/UserHoverElement";

export class TeamPage extends GenericPage {
  private get scrumMaster() {
    return new UserHoverElement(
      this.page,
      this.page.getByTestId("scrum-master"),
    );
  }
  async shouldHaveScrumMaster(username: string) {
    await this.scrumMaster.shouldBe(username);
  }
}
