import {Component} from "./Component.js";
/**
 * Sous classe avec des composants
 */
export abstract class BasicComponent extends Component{
    public ifComponentChild(): boolean {
        return false;
    }

    /**
     * défini le contenu du composant comme pouvant être modifié
     */
    public setAsUpdatable():void{
        this.htmlElement.addEventListener("click",(e:any) => {
            // on annule l'action par défaut s'il y en a
            if("preventDefault" in e) e.preventDefault();

            this.askContent(() => {
                const previousElement = this.htmlElement;

                // dessin dans une balise qui n'apparait pas
                this.drawing(document.createElement("div") );

                previousElement.replaceWith(this.htmlElement);

                // on replace l'évement sur le nouvel élélement html
                this.setAsUpdatable();
            });
        });
    }
}
