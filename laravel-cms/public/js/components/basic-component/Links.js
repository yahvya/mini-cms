import { BasicComponent } from "../BasicComponent.js";
/**
 * Les liens de notre composant
 */
export class Links extends BasicComponent {
    /**
     * le texte que contient le lien
     * @protected
     */
    text;
    /**
     * le lien que contient un lien lui-même
     * @protected
     */
    link;
    /**
     * Show the link in the same page or in a new one
     */
    showPage;
    constructor() {
        super();
        this.name = "Lien";
    }
    /**
     *
     * @protected
     * @return LinkExportFormat les données du composant
     */
    exportComponent() {
        return {
            text: this.text,
            link: this.link,
            showPage: this.showPage,
            componentName: this.name
        };
    }
    createFrom(componentsMap, component) {
        this.text = component.text;
        this.link = component.link;
        this.showPage = component.showPage;
        return this;
    }
    drawing(parent) {
        this.htmlElement = document.createElement("a");
        this.htmlElement.href = this.link;
        this.htmlElement.text = this.text;
        if (this.showPage)
            this.htmlElement.target = "_blank";
        parent.append(this.htmlElement);
        return this.htmlElement;
    }
    /**
     * met à jour le lien associé
     * @param link le lien
     */
    setLink(link) {
        this.link = link;
    }
    /**
     * met à jour le texte associé
     * @param text le texte
     */
    setText(text) {
        this.text = text;
    }
    /**
     * met à jour status d'ouvertre
     * @param showPage le status
     */
    setShowPage(showPage) {
        this.showPage = showPage;
    }
    askContent(toExecOnValidate) {
        const modal = this.getModel();
        const contente = modal.querySelector(".content");
        contente.innerHTML = `
            <div class="input-container">
                <input type="text" name="link" placeholder="Rentrer votre lien"/>
            </div>
            <div class="input-container">
                <input type="text" name="texte" placeholder="Rentrer votre texte"/>
            </div>

        `;
        modal.addEventListener("submit", () => {
            const linkInput = contente.querySelector("input[name=link]");
            const textInput = contente.querySelector("input[name=texte]");
            this.link = linkInput.value;
            this.text = textInput.value;
            this.closeModal(modal);
            toExecOnValidate();
        });
        document.body.append(modal);
    }
}
