import {Page} from "@playwright/test";
import {TextInput} from "../elements/inputs/TextInput";
import {GenericButton} from "../elements/GenericButton";
import {FormElement} from "../elements/FormElement";

export class SignUpPage {
    public readonly form: FormElement<{fullName: string, username: string, password: string}>

    constructor(protected readonly page: Page) {
        this.form = new FormElement(page, this.page.locator("form"), {
            fullName: (page, locator) => new TextInput(page, locator),
            username: (page, locator) => new TextInput(page, locator),
            password: (page, locator) => new TextInput(page, locator),
        })
    }

    async goto() {
        await this.page.goto("/sign-up")
    }

}