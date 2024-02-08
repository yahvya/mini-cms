import {ComponentChildren} from "../ComponentChildren.js";

export class Rows extends ComponentChildren{
    constructor() {
        super();
        this.name = "Ligne";
    }

    drawing(parent: HTMLElement): HTMLElement {
        this.htmlElement= document.createElement("div");
        this.htmlElement.classList.add("flex-row","Line");

        return super.drawing(parent);
    }
    public askContent(toExecOnValidate: Function): void {
        toExecOnValidate();
        
    }

}
