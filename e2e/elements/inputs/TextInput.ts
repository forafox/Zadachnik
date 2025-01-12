import {GenericInput} from "./GenericInput";
import {expect} from "@playwright/test";

export class TextInput extends GenericInput<string> {
    async setValue(value: string): Promise<void> {
        await this.locator.fill(value)
    }

    async shouldBeValue(value:string) {
        await expect(this.locator).toHaveValue(value)
    }
}