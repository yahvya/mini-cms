import { Columns } from "./Columns.js";
export class VerticalMenu extends Columns {
    constructor() {
        super();
        this.name = "Menu vertical";
    }
    drawing(parent) {
        const vertical = super.drawing(parent);
        vertical.classList.add("Vertical-Menu", "menu");
        return vertical;
    }
}
