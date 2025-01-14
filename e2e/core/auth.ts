import {APIRequestContext, BrowserContext, expect, test} from "@playwright/test";
import {SignInPage} from "../pages/SignInPage";

export const authSessionFile = "./.playwright/userAuth.json"
export const testUserName = "testuser"

export async function createTestUser(request: APIRequestContext) {
    await request.post("/api/auth/register", {
        data: {
            username: testUserName,
            password: testUserName,
            fullName: "Test User"
        }
    })
}

export function generateAuthTest() {
    return () => test('sign in', async ({ page }) => {
        await createTestUser(page.request)
        const model = new SignInPage(page)

        await model.goto();

        await model.task.setValue({username: "testuser", password: "testuser"})
        await model.task.submit.activate()
        await model.task.submit.not.shouldBeVisible()

        await expect(page).toHaveURL(new RegExp("/tasks"))

        await page.context().storageState({ path: authSessionFile });
    });
}