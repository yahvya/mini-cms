import {Rows} from "./Rows.js";

export class HorizontalMenu extends Rows{
    constructor() {
        super();
        this.name = "Menu horizontal";
    }

    public drawing(parent: HTMLElement): HTMLElement {
        const tag = super.drawing(parent);

        tag.classList.add("horizontal-menu");

        return tag;
    }
}
