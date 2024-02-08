import {Columns} from "./Columns.js";

export class VerticalMenu extends Columns{
    public drawing(parent: HTMLElement): HTMLElement {
        const vertical= super.drawing(parent);
        vertical.classList.add("Vertical-Menu");
        return vertical;

    }


}
