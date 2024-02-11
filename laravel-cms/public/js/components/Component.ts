/**
 * classe qui défini des compossants
  */
export abstract class Component {
    /**
     * name of components
     * @private
     */
    protected name : string|undefined;

    /**
     * le composant sous sa forme html
     * @protected
     */
    protected htmlElement:any;

    /**
     * fonction qui permet de demander ce qu'on peut mettre dans le composant
     * @param toExecOnValidate action à faire à la validation de la création
     */
    public abstract askContent(toExecOnValidate:Function): void;

    /**
     * methode pour exporter le composant
     */
    public abstract exportComponent() : Record<any, any>;

    /**
     * défini le composantcomme pouvant être modifié
     * @attention état non sauvegardé
     */
    public abstract setAsUpdatable():void;

    /**
     * transformer le fichier en composant
     * @param componentsMap map des composants
     * @param component bloc de composant de site
     * @protected
     */
    public abstract createFrom(componentsMap:Record<string,Function>,component:Record<any, any>):Component;

    /**
     * Methode qui permet de dessiner le composant dans son parent (menu ou page)
     * @param parent Element racine du composant
     * @protected
     */
    public abstract drawing(parent:HTMLElement):HTMLElement;

    /**
     * crée un composant à partir de sa configuration
     * @param componentsMap map des composants
     * @param component le nom du composant
     * @param componentConfig configuration du composant
     */
    public static createComponent(componentsMap:Record<string,Record<string,any> >,component:string,componentConfig:Record<any, any>):Component|null{
        return component in componentsMap ? componentsMap[component].creator(componentConfig,componentsMap) : null;
    }
    /**
     *  @return si le composant n'a pas d'enfant
     */

    public abstract  ifComponentChild():boolean;

    /**
     * sert à creer une boite de dialogue qui sera affich dans la page
     * @return Retourne la boite html
     */
    protected getModal():HTMLFormElement{
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
     * ferme la boite de dialogue fournie en l'animant
     * @param modal la boite à fermer
     * @protected
     */
    protected closeModal(modal:HTMLFormElement){
        modal.animate({opacity: 0},400).addEventListener("finish",()=>{
            modal.remove();
        });
    }

    /**
     * @return l'élement html interne
     * @attention doit être appelé après dessin
     */
    public getElement():HTMLElement{
        return this.htmlElement;
    }
 }
