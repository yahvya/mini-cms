import {Columns} from "./Columns.js";

export class VerticalMenu extends Columns{
    constructor() {
        super();
        this.name = "Menu vertical";
    }

    public drawing(parent: HTMLElement): HTMLElement {
        const vertical= super.drawing(parent);
        vertical.classList.add("Vertical-Menu","menu");

        return vertical;
    }
}
