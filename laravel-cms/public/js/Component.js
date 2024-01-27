// import {Links} from "./components/basic-component/Links.js";
// import {Texts} from "./components/basic-component/Texts.js";
// import {Images} from "./components/basic-component/Images.js";
// import {HorizontalMenu} from "./components/with-children/HorizontalMenu.js";
// import {Titles} from "./components/basic-component/Titles.js";
// import {BurgerMenu} from "./components/with-children/BurgerMenu.js";
// import {VerticalMenu} from "./components/with-children/VerticalMenu.js";
// import {Rows} from "./components/with-children/Rows.js";
// import {Columns} from "./components/with-children/Columns.js";
/**
 * classe qui défini des compossants
  */
class Component {
    /**
     * map des composants de l'application
     * @private
     */
    static componentsMap = {
    // "Lien" : (componentConfig:Record<any, any>) => new Links().createFrom(componentConfig),
    // "Texte" : (componentConfig:Record<any, any>) => new Texts().createFrom(componentConfig),
    // "Image" : (componentConfig:Record<any, any>) => new Images().createFrom(componentConfig),
    // "Titre" : (componentConfig:Record<any, any>) => new Titles().createFrom(componentConfig),
    // "Menu horizontal" : (componentConfig:Record<any, any>) => new HorizontalMenu().createFrom(componentConfig),
    // "Menu vertical" : (componentConfig:Record<any, any>) => new VerticalMenu().createFrom(componentConfig),
    // "Menu hamburger" : (componentConfig:Record<any, any>) => new BurgerMenu().createFrom(componentConfig),
    // "Ligne" : (componentConfig:Record<any, any>) => new Rows().createFrom(componentConfig),
    // "Colonne" : (componentConfig:Record<any, any>) => new Columns().createFrom(componentConfig)
    };
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
     * @param component le nom du composant
     * @param componentConfig configuration du composant
     */
    static createComponent(component, componentConfig) {
        return component in Component.componentsMap ? Component.componentsMap[component](componentConfig) : null;
    }
}
export { Component };
