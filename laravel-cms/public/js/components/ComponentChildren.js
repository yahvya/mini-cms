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
     * ajoute un enfant à la liste des enfants
     * @param toAdd le composant à ajouter
     */
    addChild(...toAdd) {
        this.children.push(...toAdd);
        return this;
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
}
