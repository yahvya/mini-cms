import { BasicComponent } from "../BasicComponent.js";
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
    createFrom(componentsMap, component) {
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
    askContent(toExecOnValidate) {
        const modal = this.getModel();
        const contente = modal.querySelector(".content");
        contente.innerHTML = `
            <div class="input-container">
                <input type="text" name="nom" placeholder="Entrer vorte texte"/>
            </div>
             <div class="input-container">
                <select name="Titre">
                    <option value="1">H1</option>
                    <option value="2">H2</option>
                    <option value="3">h3</option>
                    <option value="4">h4</option>
                </select>
            </div>
        `;
        modal.addEventListener("submit", () => {
            const text = contente.querySelector("input[name=nom]");
            this.text = text.value;
            const level = contente.querySelector("select[name=Titre]");
            this.level = parseInt(level.options[level.selectedIndex].value);
            this.closeModal(modal);
            toExecOnValidate();
        });
        document.body.append(modal);
    }
}
