/**
 * map des composants de l'application
 */
import { Links } from "./basic-component/Links.js";
import { Texts } from "./basic-component/Texts.js";
import { Images } from "./basic-component/Images.js";
import { Titles } from "./basic-component/Titles.js";
import { HorizontalMenu } from "./with-children/HorizontalMenu.js";
import { Page } from "./with-children/Page.js";
import { VerticalMenu } from "./with-children/VerticalMenu.js";
import { BurgerMenu } from "./with-children/BurgerMenu.js";
import { Rows } from "./with-children/Rows.js";
import { Columns } from "./with-children/Columns.js";
export const componentsMap = {
    "Lien": {
        "icon": "<i class=\"fa-solid fa-link\"></i>",
        "creator": (componentConfig, componentsMap) => new Links().createFrom(componentsMap, componentConfig),
        "basic-create": () => new Links()
    },
    "Texte": {
        "icon": "<i class=\"fa-solid fa-font\"></i>",
        "creator": (componentConfig, componentsMap) => new Texts().createFrom(componentsMap, componentConfig),
        "basic-create": () => new Texts()
    },
    "Image": {
        "icon": "<i class=\"fa-solid fa-image\"></i>",
        "creator": (componentConfig, componentsMap) => new Images().createFrom(componentsMap, componentConfig),
        "basic-create": () => new Images()
    },
    "Titre": {
        "icon": "<i class=\"fa-solid fa-heading\"></i>",
        "creator": (componentConfig, componentsMap) => new Titles().createFrom(componentsMap, componentConfig),
        "basic-create": () => new Titles()
    },
    "Menu horizontal": {
        "icon": "<i class=\"fa-solid fa-ruler-horizontal\"></i>",
        "creator": (componentConfig, componentsMap) => new HorizontalMenu().createFrom(componentsMap, componentConfig),
        "basic-create": () => new HorizontalMenu()
    },
    "Menu vertical": {
        "icon": "<i class=\"fa-solid fa-ruler-vertical\"></i>",
        "creator": (componentConfig, componentsMap) => new VerticalMenu().createFrom(componentsMap, componentConfig),
        "basic-create": () => new VerticalMenu()
    },
    "Menu hamburger": {
        "icon": "<i class=\"fa-solid fa-burger\"></i>",
        "creator": (componentConfig, componentsMap) => new BurgerMenu().createFrom(componentsMap, componentConfig),
        "basic-create": () => new BurgerMenu()
    },
    "Ligne": {
        "icon": "<i class=\"fa-solid fa-grip-lines\"></i>",
        "creator": (componentConfig, componentsMap) => new Rows().createFrom(componentsMap, componentConfig),
        "basic-create": () => new Rows()
    },
    "Colonne": {
        "icon": "<i class=\"fa-solid fa-table-columns\"></i>",
        "creator": (componentConfig, componentsMap) => new Columns().createFrom(componentsMap, componentConfig),
        "basic-create": () => new Columns()
    },
    "Page": {
        "creator": (componentConfig, componentsMap) => new Page().createFrom(componentsMap, componentConfig),
        "basic-create": () => new Page()
    }
};
