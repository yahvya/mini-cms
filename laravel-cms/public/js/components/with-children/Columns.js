import { ComponentChildren } from "../ComponentChildren.js";
export class Columns extends ComponentChildren {
    constructor() {
        super();
        this.name = "Colonne";
    }
    drawing(parent) {
        this.htmlElement = document.createElement("div");
        this.htmlElement.classList.add("flex-column", "Column");
        return super.drawing(parent);
    }
    askContent(toExecOnValidate) {
        toExecOnValidate();
    }
}
