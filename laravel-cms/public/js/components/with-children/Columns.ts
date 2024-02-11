import {ComponentChildren} from "../ComponentChildren.js";

export class Columns extends ComponentChildren{
    constructor() {
        super();
        this.name = "Colonne";
    }

    drawing(parent: HTMLElement): HTMLElement {
        this.htmlElement=document.createElement("div");
        this.htmlElement.classList.add("flex-column","Column");
        return super.drawing(parent);
    }

    public askContent(toExecOnValidate: Function): void {
        toExecOnValidate();

    }
}
