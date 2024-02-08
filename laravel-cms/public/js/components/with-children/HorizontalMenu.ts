import {Rows} from "./Rows.js";

export class HorizontalMenu extends Rows{
    public drawing(parent: HTMLElement): HTMLElement {
        const tag = super.drawing(parent);  

        tag.classList.add("horizontal-menu");

        return tag;
    }
}
