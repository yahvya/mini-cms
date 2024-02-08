import { HorizontalMenu } from "./HorizontalMenu.js";
export class BurgerMenu extends HorizontalMenu {
    drawing(parent) {
        const tag = super.drawing(parent);
        tag.classList.add("burger-menu");
        return tag;
    }
}
