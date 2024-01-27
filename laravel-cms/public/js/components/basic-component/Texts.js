import { BasicComponent } from "../../BasicComponent.js";
/**
 * Le texte de notre composant paragraphe
 */
export class Texts extends BasicComponent {
    /**
     * Le texte que contient le paragraphe
     * @protected
     */
    text;
    constructor() {
        super();
        this.name = "Texte";
    }
    exportComponent() {
        return {
            text: this.text,
            componentName: this.name,
        };
    }
    createFrom(component) {
        this.text = component.text;
        return this;
    }
    /**
     * Methode qui permet de dessiner le composant dans son parent (menu ou page)
     * @param parent Element racine du composant
     * @protected
     */
    drawing(parent) {
        this.htmlElement = document.createElement("p");
        this.htmlElement.textContent = this.text;
        parent.append(this.htmlElement);
        return this.htmlElement;
    }
    /**
     * met à jour le texte du paragraphe
     * @param text le texte
     */
    setText(text) {
        this.text = text;
    }
}
