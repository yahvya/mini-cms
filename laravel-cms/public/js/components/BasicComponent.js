import { Component } from "./Component.js";
/**
 * Sous classe avec des composants
 */
export class BasicComponent extends Component {
    ifComponentChild() {
        return false;
    }
    /**
     * défini le contenu du composant comme pouvant être modifié
     */
    setAsUpdatable() {
        this.htmlElement.addEventListener("click", (e) => {
            // on annule l'action par défaut s'il y en a
            if ("preventDefault" in e)
                e.preventDefault();
            this.askContent(() => {
                const previousElement = this.htmlElement;
                // dessin dans une balise qui n'apparait pas
                this.drawing(document.createElement("div"));
                previousElement.replaceWith(this.htmlElement);
                // on replace l'évement sur le nouvel élélement html
                this.setAsUpdatable();
            });
        });
    }
}
