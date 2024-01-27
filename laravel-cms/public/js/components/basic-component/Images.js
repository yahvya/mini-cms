import { BasicComponent } from "../../BasicComponent.js";
/**
 * représente une image
 */
export class Images extends BasicComponent {
    /**
     * lien de l'image
     * @protected
     */
    src;
    /**
     * texte alternatif à l'image
     * @protected
     */
    alt;
    constructor() {
        super();
        this.name = "Image";
    }
    exportComponent() {
        return {
            componentName: this.name,
            src: this.src,
            alt: this.alt
        };
    }
    createFrom(component) {
        this.src = component.src;
        this.alt = component.alt;
        return this;
    }
    drawing(parent) {
        this.htmlElement = document.createElement("img");
        this.htmlElement.src = this.src;
        this.htmlElement.alt = this.alt;
        parent.append(this.htmlElement);
        return this.htmlElement;
    }
    /**
     * met à jour le lien de l'image
     * @param src le lien de l'image
     */
    setSrc(src) {
        this.src = src;
    }
    /**
     * met à jour le texte alternatif
     * @param alt le texte alternatif
     */
    setAlt(alt) {
        this.alt = alt;
    }
}
