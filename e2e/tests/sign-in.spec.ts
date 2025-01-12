import { test, expect } from '@playwright/test';
import {SignInPage} from "../pages/SignInPage";
import {authSessionFile, createTestUser} from "../core/auth";

test.beforeAll(async ({request}) => {
  await createTestUser(request)
})

test('sign up', async ({ page }) => {
  const model = new SignInPage(page)

  await model.goto();

  await model.form.setValue({username: "testuser", password: "testuser"})
  await model.form.submit.activate()

  await expect(page).toHaveURL(new RegExp("/tasks"))

  await page.context().storageState({ path: authSessionFile });
});

