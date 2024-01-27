/**
 * Le texte de notre composant paragraphe
 */
class Texts extends BasicComponent{
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

}
