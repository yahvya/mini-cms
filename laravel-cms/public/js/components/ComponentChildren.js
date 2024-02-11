import { Component } from "./Component.js";
/**
 * classe avec des sous composants
 */
export class ComponentChildren extends Component {
    /**
     * Contient une liste des composants
     * @protected
     */
    children = [];
    /**
     * défini si le composant a été rendu comme pouvant être mise à jour
     * @protected
     */
    isUpdatable = false;
    /**
     * ajoute un enfant à la liste des enfants
     * @param toAdd le composant à ajouter
     */
    addChild(...toAdd) {
        toAdd.forEach(component => {
            this.children.push(component);
            if (this.isUpdatable)
                component.setAsUpdatable();
        });
        return this;
    }
    /**
     * vide les enfants de la class
     */
    clearChildren() {
        this.children = [];
    }
    removeChild(toRemove) {
        const index = this.children.indexOf(toRemove);
        if (index != -1) {
            delete this.children[index];
            this.children = this.children.filter(el => el != undefined);
        }
        return this;
    }
    exportComponent() {
        return {
            componentName: this.name,
            children: this.children.map(child => child.exportComponent())
        };
    }
    createFrom(componentsMap, component) {
        this.children = component.children.map((child) => Component.createComponent(componentsMap, child.componentName, child));
        return this;
    }
    drawing(parent) {
        this.children.forEach(child => child.drawing(this.htmlElement));
        parent.append(this.htmlElement);
        return this.htmlElement;
    }
    ifComponentChild() {
        return true;
    }
    /**
     * change tous les enfants du composant comme pouvant être modifié
     */
    setAsUpdatable() {
        this.children.forEach(child => {
            child.setAsUpdatable();
        });
        this.isUpdatable = true;
    }
    /**
     * @return la liste des enfants du composant
     */
    getChildren() {
        return this.children;
    }
}
