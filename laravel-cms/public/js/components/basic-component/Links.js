import { BasicComponent } from "../../BasicComponent.js";
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
    createFrom(component) {
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
}
