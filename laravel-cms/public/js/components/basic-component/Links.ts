import {BasicComponent} from "../../BasicComponent.js";

/**
 * format d'export du composant
 */
export interface LinkExportFormat{
    text: string,
    link: string,
    showPage: boolean,
    componentName: string
}

/**
 * Les liens de notre composant
 */
export class Links extends BasicComponent {
    /**
     * le texte que contient le lien
     * @protected
     */
    protected text: string | undefined;

    /**
     * le lien que contient un lien lui-même
     * @protected
     */
    protected link: string | undefined;

    /**
     * Show the link in the same page or in a new one
     */
    protected showPage: boolean | undefined;

    constructor() {
        super();

        this.name = "Lien";
    }

    /**
     *
     * @protected
     * @return LinkExportFormat les données du composant
     */
    public exportComponent() : LinkExportFormat{
        return {
            text: this.text!,
            link: this.link!,
            showPage: this.showPage!,
            componentName: this.name!
        };
    }

    public createFrom(component:Record<any, any>):Links{
        this.text = component.text;
        this.link = component.link;
        this.showPage = component.showPage;

        return this;
    }

    public drawing(parent:HTMLElement):HTMLElement{
        this.htmlElement = document.createElement("a");

        this.htmlElement.href = this.link!;
        this.htmlElement.text = this.text!;

        if(this.showPage!) this.htmlElement.target = "_blank";

        parent.append(this.htmlElement);

        return this.htmlElement;
    }

    /**
     * met à jour le lien associé
     * @param link le lien
     */
    public setLink(link:string):void{
        this.link = link;
    }

    /**
     * met à jour le texte associé
     * @param text le texte
     */
    public setText(text:string){
        this.text = text;
    }

    /**
     * met à jour status d'ouvertre
     * @param showPage le status
     */
    public setShowPage(showPage:boolean){
        this.showPage = showPage;
    }
}


