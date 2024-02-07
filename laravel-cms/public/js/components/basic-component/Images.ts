import {BasicComponent} from "../BasicComponent.js";
import {Component} from "../Component.js";

/**
 * représente une image
 */
export class Images extends BasicComponent{
    /**
     * lien de l'image
     * @protected
     */
    protected src:string|undefined;

    /**
     * texte alternatif à l'image
     * @protected
     */
    protected alt:string|undefined;

    constructor() {
        super();
        this.name = "Image";
    }

    public exportComponent(): Record<any, any> {
        return {
            componentName: this.name!,
            src: this.src!,
            alt: this.alt!
        };
    }

    public createFrom(componentsMap:Record<string,Function>,component: Record<any, any>): Component {
        this.src = component.src;
        this.alt = component.alt;

        return this;
    }

    public drawing(parent: HTMLElement): HTMLElement {
        this.htmlElement = document.createElement("img");

        this.htmlElement.src = this.src!;
        this.htmlElement.alt = this.alt!;

        parent.append(this.htmlElement);

        return this.htmlElement;
    }

    /**
     * met à jour le lien de l'image
     * @param src le lien de l'image
     */
    public setSrc(src:string):void{
        this.src = src;
    }

    /**
     * met à jour le texte alternatif
     * @param alt le texte alternatif
     */
    public setAlt(alt:string){
        this.alt = alt;
    }
    public askContent(toExecOnValidate:Function): void{
        const modal = this.getModel();
        const contente = modal.querySelector(".content");

        contente!.innerHTML=`
            <div class="input-container">
                <input type="text" name="alt" placeholder="Entrez le alt de l'image">
            </div>

            <div class="input-container">
                <input type="file" name="crc" accept="jpeg,png"/>
            </div>

            <p class="text-center">Ou</p>

            <div class="input-container">
                <input type="text" name="src" placeholder="Lien de l'image"/>
            </div>

        `;

        modal.addEventListener("submit",()=> {
            const alt:HTMLInputElement=contente!.querySelector("input[name=alt]")!;
            this.alt= alt.value;
            const src:HTMLInputElement=contente!.querySelector("input[name=src]")!;
           if(src.value.length==0) {
           }
            else {
               this.src=src.value;
           }

            this.closeModal(modal);
            toExecOnValidate();
        } );

        document.body.append(modal);
    }

}
