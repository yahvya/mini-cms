import {BasicComponent} from "../../BasicComponent.js";
import {Component} from "../../Component.js";

/**
 * Le texte de notre composant paragraphe
 */
export class Texts extends BasicComponent{
    /**
     * Le texte que contient le paragraphe
     * @protected
     */
    protected text:string|undefined;
    constructor() {
        super();
        this.name="Texte"
    }
    public  exportComponent() : Record<any, any>{
        return {
            text : this.text!,
            componentName:this.name!,
        }
    }

    public createFrom(component:Record<any, any>):Component{
        this.text= component.text;

        return this;
    }

    /**
     * Methode qui permet de dessiner le composant dans son parent (menu ou page)
     * @param parent Element racine du composant
     * @protected
     */
    public drawing(parent:HTMLElement):HTMLElement {
        this.htmlElement = document.createElement("p");
        this.htmlElement.textContent = this.text!;

        parent.append(this.htmlElement);

        return this.htmlElement;
    }

    /**
     * met à jour le texte du paragraphe
     * @param text le texte
     */
    public setText(text:string){
        this.text = text;
    }

}
