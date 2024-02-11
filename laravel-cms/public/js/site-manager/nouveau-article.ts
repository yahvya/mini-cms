import {Component} from "../components/Component.js";
import ComponentsMap from "../components/ComponentRegistration.js";
declare var article:Record<string,any>;

const form = document.querySelector("#page")!;
const page = Component.createComponent(ComponentsMap["ComponentsMap"],"Page",article["page-content"])!;

// dessin de la page et rendu modifiable
page.drawing(form.querySelector(".page-container")!);
page.setAsUpdatable();

// ajout des données de la page dans le formulaire
form!.addEventListener("submit",() => {
    const input = document.createElement("input")
    input.name = "new-article";
    input.value = JSON.stringify(page!.exportComponent() );

    form.append(input);
});
