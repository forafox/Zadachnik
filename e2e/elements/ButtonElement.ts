import {GenericElement} from "./GenericElement";

export class ButtonElement extends GenericElement {
    async activate() {
        await this.locator.click()
    }
}