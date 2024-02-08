import { ComponentChildren } from "../ComponentChildren.js";
export class Rows extends ComponentChildren {
    constructor() {
        super();
        this.name = "Ligne";
    }
    drawing(parent) {
        this.htmlElement = document.createElement("div");
        this.htmlElement.classList.add("flex-row", "Line","justify-around");
        return super.drawing(parent);
    }
    askContent(toExecOnValidate) {
        toExecOnValidate();
    }
}
