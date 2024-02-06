import {BasicComponent} from "../BasicComponent.js";

/**
 * La classe title represente la balise html h
 */
export class Titles extends BasicComponent{
    /**
     * @protected texte que contient le titre
     */
    protected text:string|undefined;
    /**
     * @protected Le niveau des titres que contient le titre
     */
    protected level:Number|undefined;
    constructor() {
        super();
        this.name="Titre"
    }

    public  exportComponent() : Record<any, any>{
        return {
            text : this.text!,
            level:this.level!,
            componentName:this.name!,
        }

    }

    public createFrom(componentsMap:Record<string,Function>,component:Record<any, any>):Titles{
        this.text= component.text;
        this.level = component.level;

        return this;
    }

    public drawing(parent:HTMLElement):HTMLElement {
        this.htmlElement = document.createElement(`h${this.level}`);
        this.htmlElement.textContent = this.text!;

        parent.append(this.htmlElement);

        return this.htmlElement;
    }

    /**
     * met à jour le texte du paragraphe
     * @param text le texte
     */
    public setText(text:string):void{
        this.text = text;
    }

    /**
     * met à jour le niveau de titre
     * @param level le niveau
     */
    public setlevel(level:number):void{
        this.level = level;
    }
}

