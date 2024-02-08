import {Component} from "../components/Component.js";
import ComponentsMap from "../components/ComponentRegistration.js";
import {Page} from "../components/with-children/Page.js";
import componentsMap from "../components/ComponentRegistration.js";

const componentsContainer = document.querySelector(".Components");
const searchInput:HTMLInputElement = document.querySelector(".Components .search")!;
const searchComponent:Record<string, any> = {};
const pageComponents:Page = new Page();

pageComponents.drawing(document.querySelector(".page-result")! );

// affichage des composants
for( const ComponentList in ComponentsMap["ComponentsMap"] ) {
    const list= document.createElement("div");

    list.classList.add("Together","flex-row","align-center");
    list.innerHTML= `<p>${ComponentList}</p>`;

    if(ComponentsMap["ComponentsMap"][ComponentList].icon !== null) list.innerHTML += ComponentsMap["ComponentsMap"][ComponentList].icon;

    $("#page").droppable({
        accept: '.Together',
        drop: function(event,ui){
            const component = ComponentsMap["ComponentsMap"][ui.draggable.text()]["basic-create"]();

            pageComponents.addChild(component);

            component.askContent(() => {
                component.drawing($(this) );
            });
        }
    });

    $(list).draggable({
        helper: 'clone'
    });

    componentsContainer!.append(list);

    // enregistrement des composants dans le gestionnaire de recherche
    searchComponent[ComponentList] = list;
}

// évenement de recherche
searchInput.addEventListener("input",() => {
    const research:string = searchInput.value.toLowerCase();
    let toShow = [];

    if (research.length==0){
        // on récupérère tous les composants
        toShow = Object.keys(searchComponent);
    }
    else toShow = Object.keys(searchComponent).filter((componentName:string) => componentName.toLowerCase().match(`^${research}.*`) );

    for(const componentName in searchComponent){


        if(toShow.includes(componentName) )
            componentsContainer!.append(searchComponent[componentName]);
        else
            searchComponent[componentName].remove();
    }
});
