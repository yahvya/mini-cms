import {ComponentChildren} from "../ComponentChildren.js";

/**
 * Page contient les composants
 */
 export class Page extends ComponentChildren{
     constructor() {
         super();
         this.name = "Page";
     }

    drawing(parent: HTMLElement): HTMLElement {
        this.htmlElement = document.createElement("div");
        this.htmlElement.id = "page";

        return super.drawing(parent);
    }
}
