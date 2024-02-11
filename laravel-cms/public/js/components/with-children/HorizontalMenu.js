import { Rows } from "./Rows.js";
export class HorizontalMenu extends Rows {
    constructor() {
        super();
        this.name = "Menu horizontal";
    }
    drawing(parent) {
        const tag = super.drawing(parent);
        tag.classList.add("horizontal-menu");
        return tag;
    }
}
