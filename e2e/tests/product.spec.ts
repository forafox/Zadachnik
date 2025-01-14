import { expect, test } from "@playwright/test";
import { SignInPage } from "../pages/SignInPage";
import { authSessionFile, generateAuthTest, testUserName } from "../core/auth";
import { Sidebar } from "../elements/Sidebar";
import { TeamsPage } from "../pages/TeamsPage";
import { TeamPage } from "../pages/TeamPage";

generateAuthTest()();

test.use({ storageState: authSessionFile });

const testTeamTitle = "TestTeam";

test.describe("product", () => {
  test("create product", async ({ page }) => {
    const teamsPage = new TeamsPage(page);
    await teamsPage.goto();
    await expect(page.getByText("Zadachnik")).toBeVisible();

    await teamsPage.sidebar.teams.create.activate();
    await teamsPage.team.setValue({ title: testTeamTitle });
    await teamsPage.team.submit.activate();
    // check that modal is closed
    await teamsPage.team.submit.not.shouldBeVisible();

    const team = teamsPage.sidebar.teams.get(testTeamTitle);
    await team.shouldBeVisible();
    await team.activate();
    const teamPage = new TeamPage(page);
    await teamPage.shouldHaveScrumMaster(testUserName);
  });
});
