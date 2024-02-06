/**
 * map des composants de l'application
 */

import {Links} from "./basic-component/Links.js";
import {Texts} from "./basic-component/Texts.js";
import {Images} from "./basic-component/Images.js";
import {Titles} from "./basic-component/Titles.js";
import {HorizontalMenu} from "./with-children/HorizontalMenu.js";
import {VerticalMenu} from "./with-children/VerticalMenu.js";
import {BurgerMenu} from "./with-children/BurgerMenu.js";
import {Rows} from "./with-children/Rows.js";
import {Columns} from "./with-children/Columns.js";

export default {
    "ComponentsMap" : {
        "Lien" : (componentConfig:Record<any, any>,componentsMap:Record<string,Function>) => new Links().createFrom(componentsMap,componentConfig),
        "Texte" : (componentConfig:Record<any, any>,componentsMap:Record<string,Function>) => new Texts().createFrom(componentsMap,componentConfig),
        "Image" : (componentConfig:Record<any, any>,componentsMap:Record<string,Function>) => new Images().createFrom(componentsMap,componentConfig),
        "Titre" : (componentConfig:Record<any, any>,componentsMap:Record<string,Function>) => new Titles().createFrom(componentsMap,componentConfig),
        "Menu horizontal" : (componentConfig:Record<any, any>,componentsMap:Record<string,Function>) => new HorizontalMenu().createFrom(componentsMap,componentConfig),
        "Menu vertical" : (componentConfig:Record<any, any>,componentsMap:Record<string,Function>) => new VerticalMenu().createFrom(componentsMap,componentConfig),
        "Menu hamburger" : (componentConfig:Record<any, any>,componentsMap:Record<string,Function>) => new BurgerMenu().createFrom(componentsMap,componentConfig),
        "Ligne" : (componentConfig:Record<any, any>,componentsMap:Record<string,Function>) => new Rows().createFrom(componentsMap,componentConfig),
        "Colonne" : (componentConfig:Record<any, any>,componentsMap:Record<string,Function>) => new Columns().createFrom(componentsMap,componentConfig)
    }
};
