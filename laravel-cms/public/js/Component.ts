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
export abstract class Component {

    /**
     * map des composants de l'application
     * @private
     */
    private static componentsMap:Record<string,Function> = {
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
    protected name : string|undefined;

    /**
     * le composant sous sa forme html
     * @protected
     */
    protected htmlElement:any;

    /**
     * methode pour exporter le composant
     */
    public abstract exportComponent() : Record<any, any>;

    /**
     * tronsormer le fichier en composant
     * @param component bloc de composant de site
     * @protected
     */
    public abstract createFrom(component:Record<any, any>):Component;

    /**
     * Methode qui permet de dessiner le composant dans son parent (menu ou page)
     * @param parent Element racine du composant
     * @protected
     */
    public abstract drawing(parent:HTMLElement):HTMLElement;

    /**
     * crée un composant à partir de sa configuration
     * @param component le nom du composant
     * @param componentConfig configuration du composant
     */
    public static createComponent(component:string,componentConfig:Record<any, any>):Component|null{
        return component in Component.componentsMap ? Component.componentsMap[component](componentConfig) : null;
    }
 }
