/**
 * représente une image
 */
class Images extends BasicComponent{
    /**
     * lien de l'image
     * @protected
     */
    protected src:string|undefined;

    /**
     * texte alternatif à l'image
     * @protected
     */
    protected alt:string|undefined;

    constructor() {
        super();
        this.name = "Image";
    }

    public exportComponent(): Record<any, any> {
        return {
            componentName: this.name!,
            src: this.src!,
            alt: this.alt!
        };
    }

    public createFrom(component: Record<any, any>): Component {
        this.src = component.src;
        this.alt = component.alt;

        return this;
    }

    public drawing(parent: HTMLElement): HTMLElement {
        this.htmlElement = document.createElement("img");

        this.htmlElement.src = this.src!;
        this.htmlElement.alt = this.alt!;

        parent.append(this.htmlElement);

        return this.htmlElement;
    }
}
