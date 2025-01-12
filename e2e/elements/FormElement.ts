import {GenericInput} from "./inputs/GenericInput";
import {Locator, Page} from "@playwright/test";
import {GenericButton} from "./GenericButton";

type ValuesElements<T extends Record<string, unknown>> = {
    readonly [K in keyof T]: GenericInput<T[K]>;
}

type ValueElementsConstructors<T extends Record<string, unknown>> = {
    readonly [K in keyof T]: (page: Page, locator: Locator) => GenericInput<T[K]>
}

export class FormElement<Values extends Record<string, unknown>> {
    protected readonly inputs: ValuesElements<Values>
    public readonly submit: GenericButton

    constructor(protected page: Page, protected locator: Locator, protected elementsConstructors: ValueElementsConstructors<Values>) {
        this.submit = new GenericButton(this.page, this.locator.locator("[type=submit]"))
        const keys = Object.keys(elementsConstructors) as Array<keyof Values>
        // @ts-ignore
        this.inputs = keys.map((key) => {
            return {[key]: elementsConstructors[key](page, locator.locator(`[name=${String(key)}]`))}
        }).reduce((a, b) => ({...a, ...b}), {})
        console.log(this.inputs)
    }

    async setValue(value: Values) {
        const keys: Array<keyof Values> = Object.keys(value)

        for(const key of keys) {
            await this.inputs[key].setValue(value[key])
        }
    }
}