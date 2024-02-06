import {Component} from "../components/Component.js";
import ComponentsMap from "../components/ComponentRegistration.js";

const componentsContainer = document.querySelector(".Components");
const searchInput = document.querySelector(".Components .search");
const searchComponent = {};

// affichage des composants
for( const ComponentList in ComponentsMap["ComponentsMap"] ) {
    const list=document.createElement("div");

    list.classList.add("Together","flex-row","align-center");
    list.innerHTML= `<p>${ComponentList}</p>`;

    if(ComponentsMap["ComponentsMap"][ComponentList].icon !== null) list.innerHTML += ComponentsMap["ComponentsMap"][ComponentList].icon;

    componentsContainer.append(list);

    // enregistrement des composants dans le gestionnaire de recherche
    searchComponent[ComponentList] = list;
}

// évenement de recherche
searchInput.addEventListener("input",() => {
    let toShow = [];

    if (searchInput.value.length==0){
        // on récupérère tous les composants
        toShow = Object.keys(searchComponent);
    }
    
});
