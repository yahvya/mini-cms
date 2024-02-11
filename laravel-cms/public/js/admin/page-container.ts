import {componentsMap} from "../components/ComponentRegistration.js";
import {Page} from "../components/with-children/Page.js";

export const pageComponents:Page = new Page();
const componentHistory:Array<any> = [pageComponents];

const componentsContainer:HTMLDivElement = document.querySelector(".Components")!;
const searchInput:HTMLInputElement = document.querySelector(".Components .search")!;
const searchComponent:Record<string, any> = {};

export const page:HTMLElement = pageComponents.drawing(document.querySelector(".page-result .first-container")! );

// ajout de l'index du composant page
page.setAttribute("data-index","0");

// affichage des composants
for( const ComponentList in componentsMap ) {
    if(ComponentList == "Page") continue;

    const list= document.createElement("div");

    list.classList.add("Together","flex-row","align-center");
    list.innerHTML= `<p>${ComponentList}</p>`;

    if(componentsMap[ComponentList].icon !== null) list.innerHTML += componentsMap[ComponentList].icon;

    // on permet de glisser les composants dans la page
    $(page).droppable(createDroppable() );

    // permet de rendre le composant glissable
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

        // affiche / suppresion du composant dans la liste en fonction de son état trouvé
        if(toShow.includes(componentName) )
            componentsContainer!.append(searchComponent[componentName]);
        else
            searchComponent[componentName].remove();
    }
});

/**
 *  crée la configuration d'un élement droppable
 * @returns la configuration
 */
function createDroppable(){
    return {
        accept: '.Together',
        greedy: true,
        drop: function(event:any,ui:any){
            const component = componentsMap[ui.draggable.text()]["basic-create"]();

            // demande de la configuration du composant
            component.askContent(() => {
                // ajout du composant dans les enfants de son parent
                componentHistory[parseInt($(this).data("index"))].addChild(component);
                // sauvegarde du composant pour l'historique
                componentHistory.push(component);
                // dessin du composant
                const drawedComponent:HTMLElement = component.drawing($(this) );

                drawedComponent.setAttribute("data-index",`${componentHistory.length-1}`);

                if(component.ifComponentChild()){
                    // transformation du composant en droppable
                    $(drawedComponent).droppable(createDroppable() );
                }
            });
        }
    };
}
