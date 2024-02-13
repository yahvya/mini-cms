/**
 * map des composants de l'application
 */

import {Links} from "./basic-component/Links.js";
import {Texts} from "./basic-component/Texts.js";
import {Images} from "./basic-component/Images.js";
import {Titles} from "./basic-component/Titles.js";
import {HorizontalMenu} from "./with-children/HorizontalMenu.js";
import {Page} from "./with-children/Page.js";
import {VerticalMenu} from "./with-children/VerticalMenu.js";
import {Section} from "./with-children/Section.js";
import {BurgerMenu} from "./with-children/BurgerMenu.js";
import {Rows} from "./with-children/Rows.js";
import {Columns} from "./with-children/Columns.js";

export const componentsMap:Record<string, Record<string, any>> = {
    "Section" : {
        "icon" : "<i class=\"fa-regular fa-square\"></i>",
        "creator" : (componentConfig:Record<any, any>,componentsMap:Record<string,Function>) => new Section().createFrom(componentsMap,componentConfig),
        "basic-create" : () => new Section()
    },
    "Lien": {
        "icon" : "<i class=\"fa-solid fa-link\"></i>",
        "creator": (componentConfig:Record<any, any>,componentsMap:Record<string,Function>) => new Links().createFrom(componentsMap,componentConfig),
        "basic-create" : () => new Links()
    },
    "Texte": {
        "icon" : "<i class=\"fa-solid fa-font\"></i>",
        "creator": (componentConfig:Record<any, any>,componentsMap:Record<string,Function>) => new Texts().createFrom(componentsMap,componentConfig),
        "basic-create" : () => new Texts()
    },
    "Image": {
        "icon" : "<i class=\"fa-solid fa-image\"></i>",
        "creator": (componentConfig:Record<any, any>,componentsMap:Record<string,Function>) => new Images().createFrom(componentsMap,componentConfig),
        "basic-create" : () => new Images()
    },
    "Titre": {
        "icon" : "<i class=\"fa-solid fa-heading\"></i>",
        "creator": (componentConfig:Record<any, any>,componentsMap:Record<string,Function>) => new Titles().createFrom(componentsMap,componentConfig),
        "basic-create" : () => new Titles()
    },
    "Menu horizontal": {
        "icon" : "<i class=\"fa-solid fa-ruler-horizontal\"></i>",
        "creator": (componentConfig:Record<any, any>,componentsMap:Record<string,Function>) => new HorizontalMenu().createFrom(componentsMap,componentConfig),
        "basic-create" : () => new HorizontalMenu()
    },
    "Menu vertical": {
        "icon" : "<i class=\"fa-solid fa-ruler-vertical\"></i>",
        "creator": (componentConfig:Record<any, any>,componentsMap:Record<string,Function>) => new VerticalMenu().createFrom(componentsMap,componentConfig),
        "basic-create" : () => new VerticalMenu()
    },
    "Menu hamburger": {
        "icon" : "<i class=\"fa-solid fa-burger\"></i>",
        "creator": (componentConfig:Record<any, any>,componentsMap:Record<string,Function>) => new BurgerMenu().createFrom(componentsMap,componentConfig),
        "basic-create" : () => new BurgerMenu()
    },
    "Ligne": {
        "icon" : "<i class=\"fa-solid fa-grip-lines\"></i>",
        "creator": (componentConfig:Record<any, any>,componentsMap:Record<string,Function>) => new Rows().createFrom(componentsMap,componentConfig),
        "basic-create" : () => new Rows()
    },
    "Colonne": {
        "icon" : "<i class=\"fa-solid fa-table-columns\"></i>",
        "creator": (componentConfig:Record<any, any>,componentsMap:Record<string,Function>) => new Columns().createFrom(componentsMap,componentConfig),
        "basic-create" : () => new Columns()
    },
    "Page": {
        "creator": (componentConfig:Record<any, any>,componentsMap:Record<string,Function>) => new Page().createFrom(componentsMap,componentConfig),
        "basic-create" : () => new Page()
    }
};
