import {GenericElement} from "./GenericElement";

export class GenericButton extends GenericElement {
    async activate() {
        await this.locator.click()
    }
}