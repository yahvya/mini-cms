import {ComponentChildren} from "../ComponentChildren.js";

/**
 * représente une section
 */
export class Section extends ComponentChildren{
    constructor() {
        super();
        this.name = "Section";
    }

    drawing(parent: HTMLElement): HTMLElement {
        this.htmlElement = document.createElement("div");

        this.htmlElement.classList.add("section");

        return super.drawing(parent);
    }

    public askContent(toExecOnValidate: Function): void {
        toExecOnValidate();
    }
}
