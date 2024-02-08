import { Columns } from "./Columns.js";
export class VerticalMenu extends Columns {
    drawing(parent) {
        const vertical = super.drawing(parent);
        vertical.classList.add("Vertical-Menu");
        return vertical;
    }
}
