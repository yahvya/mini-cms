import {HorizontalMenu} from "./HorizontalMenu.js";

export class BurgerMenu extends HorizontalMenu{
    public drawing(parent: HTMLElement): HTMLElement {
        const tag = super.drawing(parent);  

        tag.classList.add("burger-menu");

        return tag;
    }
}
