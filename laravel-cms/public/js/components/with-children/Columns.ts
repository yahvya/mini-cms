import {ComponentChildren} from "../../ComponentChildren.js";

export class Columns extends ComponentChildren{
    constructor() {
        super();
        this.name = "Colonne";
    }

    drawing(parent: HTMLElement): HTMLElement {
        this.htmlElement=document.createElement("div");
        this.htmlElement.classList.add("lex-column");
        return super.drawing(parent);
    }

}
