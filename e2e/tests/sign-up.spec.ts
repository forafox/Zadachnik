import { test, expect } from '@playwright/test';
import {SignUpPage} from "../pages/SignInPage";

test('sign up', async ({ page }) => {
  const model = new SignUpPage(page)

  await model.goto();

  await model.form.setValue({fullName: "Test User",username: "testuser", password: "testpassword"})
  await model.form.submit.activate()

  await expect(page).toHaveURL(new RegExp("/tasks"))

});

