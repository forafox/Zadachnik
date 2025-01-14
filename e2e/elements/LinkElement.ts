import {GenericElement} from "./GenericElement";

export class LinkElement extends GenericElement {
    async activate() {
        return this.locator.click()
    }
}