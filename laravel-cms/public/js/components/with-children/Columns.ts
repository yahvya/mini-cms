class Columns extends ComponentChildren{
    drawing(parent: HTMLElement): HTMLElement {
        this.htmlElement=document.createElement("div");
        this.htmlElement.classList.add("lex-column");
        return super.drawing(parent);
    }

}
