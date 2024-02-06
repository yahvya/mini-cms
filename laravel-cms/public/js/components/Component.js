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
        return component in componentsMap ? componentsMap[component].create(componentConfig, componentsMap) : null;
    }
}
