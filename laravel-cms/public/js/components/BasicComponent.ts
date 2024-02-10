import {Component} from "./Component.js";
/**
 * Sous classe avec des composants
 */
export abstract class BasicComponent extends Component{
    /**
     * sert a creer un model qui sera afficher dans la page
     * @return Retourne le model html
     */
    protected getModel():HTMLFormElement{
       const model = document.createElement("form");
       model.classList.add("modal","flex-column","align-center");
       model.innerHTML = `

            <i class="fa-solid fa-xmark"></i>
            <p class="text-center">Configurer</p>
            <div class="content"></div>
            <button class="special-button filled-one" style="--width: 200px">Créer</button>

       `;
       model.querySelector("i")!.addEventListener("click",() => this.closeModal(model) );
       model.addEventListener("submit",(e) => {
           e.preventDefault();
       });

       return model;
    }

    /**
     * ferme le modal en l'animant
     * @param modal la modal à fermer
     * @protected
     */
    protected closeModal(modal:HTMLFormElement){
        modal.animate({opacity: 0},400).addEventListener("finish",()=>{
            modal.remove();
        });
    }
    public ifComponentChild(): boolean {
        return false;
    }
    
    /**
     * défini le contenu du composant comme pouvant être modifié
     */
    public setAsUpdatable():void{
        this.htmlElement.addEventListener("click",() => {
            this.askContent(() => {
                const previousElement = this.htmlElement;

                // dessin dans une balise qui n'apparait pas
                this.drawing(document.createElement("div") );
                
                previousElement.replaceWith(this.htmlElement);
            });
        });
    }
}
