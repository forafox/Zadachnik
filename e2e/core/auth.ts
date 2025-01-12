import {APIRequestContext, BrowserContext} from "@playwright/test";

export const authSessionFile = "./.playwright/userAuth.json"

export async function createTestUser(request: APIRequestContext) {
    await request.post("/api/auth/register", {
        data: {
            username: "testuser",
            password: "testuser",
            fullName: "Test User"
        }
    })
}