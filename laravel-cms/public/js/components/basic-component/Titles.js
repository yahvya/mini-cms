import { BasicComponent } from "../../BasicComponent.js";
/**
 * La classe title represente la balise html h
 */
export class Titles extends BasicComponent {
    /**
     * @protected texte que contient le titre
     */
    text;
    /**
     * @protected Le niveau des titres que contient le titre
     */
    level;
    constructor() {
        super();
        this.name = "Titre";
    }
    exportComponent() {
        return {
            text: this.text,
            level: this.level,
            componentName: this.name,
        };
    }
    createFrom(component) {
        this.text = component.text;
        this.level = component.level;
        return this;
    }
    drawing(parent) {
        this.htmlElement = document.createElement(`h${this.level}`);
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
    /**
     * met à jour le niveau de titre
     * @param level le niveau
     */
    setlevel(level) {
        this.level = level;
    }
}
