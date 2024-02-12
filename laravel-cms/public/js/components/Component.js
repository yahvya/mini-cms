/**
 * classe qui défini des compossants
  */
export class Component {
    /**
     * name of components
     * @private
     */
    name;
    /**
     * le composant sous sa forme html
     * @protected
     */
    htmlElement;
    /**
     * crée un composant à partir de sa configuration
     * @param componentsMap map des composants
     * @param component le nom du composant
     * @param componentConfig configuration du composant
     */
    static createComponent(componentsMap, component, componentConfig) {
        return component in componentsMap ? componentsMap[component].creator(componentConfig, componentsMap) : null;
    }
    /**
     * sert à creer une boite de dialogue qui sera affich dans la page
     * @return Retourne la boite html
     */
    getModal() {
        const model = document.createElement("form");
        model.classList.add("modal", "flex-column", "align-center");
        model.innerHTML = `

            <i class="fa-solid fa-xmark"></i>
            <p class="text-center">Configurer</p>
            <div class="content"></div>
            <button class="special-button filled-one" style="--width: 200px">Créer</button>

       `;
        model.querySelector("i").addEventListener("click", () => this.closeModal(model));
        model.addEventListener("submit", (e) => {
            e.preventDefault();
        });
        return model;
    }
    /**
     * ferme la boite de dialogue fournie en l'animant
     * @param modal la boite à fermer
     * @protected
     */
    closeModal(modal) {
        modal.animate({ opacity: 0 }, 400).addEventListener("finish", () => {
            modal.remove();
        });
    }
    /**
     * @return l'élement html interne
     * @attention doit être appelé après dessin
     */
    getElement() {
        return this.htmlElement;
    }
    /**
     * @return le nom du composant
     */
    getName() {
        return this.name;
    }
}
