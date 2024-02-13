import {Component} from "./components/Component.js";
import {componentsMap} from "./components/ComponentRegistration.js";

declare var page:Record<any,any>;
declare var prefix:string;

const pageComponent:Component = Component.createComponent(componentsMap,"Page",page);

pageComponent.drawing(document.querySelector(".result-container"));

document.querySelectorAll("a").forEach((a:HTMLAnchorElement) => {
    const link:string = a.getAttribute("href");

    if(link.startsWith("\/") ) a.setAttribute("href",prefix.replace("-replace-",link) )
});


