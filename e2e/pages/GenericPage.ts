import {Page} from "@playwright/test";
import {FormElement} from "../elements/FormElement";
import {TextInput} from "../elements/inputs/TextInput";
import {Sidebar} from "../elements/Sidebar";

export class GenericPage {
    constructor(protected readonly page: Page) {
    }

    get sidebar() {
        return new Sidebar(this.page)
    }
}