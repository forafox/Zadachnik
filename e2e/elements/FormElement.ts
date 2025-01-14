import {GenericInput} from "./inputs/GenericInput";
import {Locator, Page} from "@playwright/test";
import {ButtonElement} from "./ButtonElement";
import {GenericElement} from "./GenericElement";

type ValuesElements<T extends Record<string, unknown>> = {
    readonly [K in keyof T]: GenericInput<T[K]>;
}

type ValueElementsConstructors<T extends Record<string, unknown>> = {
    readonly [K in keyof T]: (page: Page, locator: Locator) => GenericInput<T[K]>
}

export class FormElement<Values extends Record<string, unknown>> extends GenericElement{
    protected readonly inputs: ValuesElements<Values>
    public readonly submit: ButtonElement

    constructor(protected page: Page, protected locator: Locator, protected elementsConstructors: ValueElementsConstructors<Values>, protected positive: boolean = true) {
        super(page, locator, positive);
        this.submit = new ButtonElement(this.page, this.locator.locator("[type=submit]"))
        const keys = Object.keys(elementsConstructors) as Array<keyof Values>
        // @ts-ignore
        this.inputs = keys.map((key) => {
            return {[key]: elementsConstructors[key](page, locator.locator(`[name=${String(key)}]`))}
        }).reduce((a, b) => ({...a, ...b}), {})
    }

    async setValue(value: Values) {
        const keys: Array<keyof Values> = Object.keys(value)

        for(const key of keys) {
            await this.inputs[key].setValue(value[key])
        }
    }
}