import {componentsMap} from "../components/ComponentRegistration.js";
import {Page} from "../components/with-children/Page.js";

export const pageComponents:Page = new Page();
export const componentHistory:Array<any> = [pageComponents];

const componentsContainer:HTMLDivElement = document.querySelector(".Components")!;
const searchInput:HTMLInputElement = document.querySelector(".Components .search")!;
const searchComponent:Record<string, any> = {};

export const page:HTMLElement = pageComponents.drawing(document.querySelector(".page-result .first-container")! );

// on rend la page avec ses composants comme pouvant être modifié
pageComponents.setAsUpdatable();

// ajout de l'index du composant page
page.setAttribute("data-index","0");

// on permet de glisser les composants dans la page
$(page).droppable(createDroppable() );

// affichage des composants
for( const ComponentList in componentsMap ) {
    if(ComponentList == "Page") continue;

    const list= document.createElement("div");

    list.classList.add("Together","flex-row","align-center");
    list.innerHTML= `<p>${ComponentList}</p>`;

    if(componentsMap[ComponentList].icon !== null) list.innerHTML += componentsMap[ComponentList].icon;

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

// évenement de preview
page.addEventListener("mousedown",()=>{
    page.classList.add("preview");
});

page.addEventListener("mouseup",()=>{
    page.classList.remove("preview");
});

/**
 *  crée la configuration d'un élement droppable
 * @returns la configuration
 */
export function createDroppable(){
    return {
        accept: '.Together',
        greedy: true,
        drop: function(event:any,ui:any){
            const component = componentsMap[ui.draggable.text()]["basic-create"]();

            // demande de la configuration du composant
            component.askContent(() => {
                // sauvegarde du composant pour l'historique
                componentHistory.push(component);
                // dessin du composant
                const drawedComponent:HTMLElement = component.drawing($(this) );
                // ajout de son index dans l'historique
                drawedComponent.setAttribute("data-index",`${componentHistory.length-1}`);
                // ajout du composant dans les enfants de son parent
                componentHistory[parseInt($(this).data("index"))].addChild(component);

                // transformation du composant en droppable si c'est un élement conteneur
                if(component.ifComponentChild()) $(drawedComponent).droppable(createDroppable() );

                updateHistory();
            });
        }
    };
}

/**
 * met à jour l'historique
 */
export function updateHistory(){

}
