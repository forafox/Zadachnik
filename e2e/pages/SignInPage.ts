import {Page} from "@playwright/test";
import {TextInput} from "../elements/inputs/TextInput";
import {GenericButton} from "../elements/GenericButton";
import {FormElement} from "../elements/FormElement";

export class SignInPage {
    public readonly form: FormElement<{username: string, password: string}>
b
    constructor(protected readonly page: Page) {
        this.form = new FormElement(page, this.page.locator("form"), {
            username: (page, locator) => new TextInput(page, locator),
            password: (page, locator) => new TextInput(page, locator),
        })
    }

    async goto() {
        await this.page.goto("/sign-in")
    }

}