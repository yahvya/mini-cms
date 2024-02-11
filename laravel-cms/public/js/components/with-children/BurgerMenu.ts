import { ComponentChildren } from "../ComponentChildren.js";

export class BurgerMenu extends ComponentChildren{
    constructor() {
        super();
        this.name = "Menu hamburger";
    }

    public askContent(toExecOnValidate: Function): void {
        toExecOnValidate();
    }

    public drawing(parent: HTMLElement): HTMLElement {
        this.htmlElement= document.createElement("div");
        this.htmlElement.classList.add("flex-row","Line");

        const burger= document.createElement("div");

        burger.classList.add("burger-menu");
        burger.innerHTML= `
        <input type="checkbox" id="bg-menu" autocomplete="off">

        <label for="bg-menu" class="flex-column align-center justify-center">

            <span></span>
            <span></span>
            <span></span>
        </label>`;

        burger.append(this.htmlElement);
        parent.append(burger);

        super.drawing(burger);

        return this.htmlElement;
    }
}
