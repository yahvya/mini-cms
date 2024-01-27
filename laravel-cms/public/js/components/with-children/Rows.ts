class Rows extends ComponentChildren{
    drawing(parent: HTMLElement): HTMLElement {
        this.htmlElement= document.createElement("div");
        this.htmlElement.classList.add("flex-row");
        return super.drawing(parent);
    }

}
