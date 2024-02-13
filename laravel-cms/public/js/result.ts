import {Component} from "./components/Component.js";
import {componentsMap} from "./components/ComponentRegistration.js";

declare var page:Record<any,any>;

const pageComponent:Component = Component.createComponent(componentsMap,"Page",page);

pageComponent.drawing(document.body);

