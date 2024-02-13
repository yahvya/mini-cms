import { ComponentChildren } from "../ComponentChildren.js";
export class BurgerMenu extends ComponentChildren {
    /**
     * conteneur général du menu burger
     * @protected
     */
    burger;
    constructor() {
        super();
        this.name = "Menu hamburger";
    }
    askContent(toExecOnValidate) {
        toExecOnValidate();
    }
    drawing(parent) {
        this.htmlElement = document.createElement("div");
        this.htmlElement.classList.add("flex-column", "Column");
        this.burger = document.createElement("div");
        this.burger.classList.add("burger-menu", "menu");
        this.burger.innerHTML = `
        <input type="checkbox" id="bg-menu" autocomplete="off">

        <label for="bg-menu" class="flex-column align-center justify-center">
            <span></span>
            <span></span>
            <span></span>
        </label>`;
        this.burger.append(this.htmlElement);
        parent.append(this.burger);
        super.drawing(this.burger);
        return this.htmlElement;
    }
    removeElement() {
        this.burger.remove();
    }
}
