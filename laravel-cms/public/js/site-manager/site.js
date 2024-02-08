import ComponentsMap from "../components/ComponentRegistration.js";
import { Page } from "../components/with-children/Page.js";
const componentsContainer = document.querySelector(".Components");
const searchInput = document.querySelector(".Components .search");
const searchComponent = {};
const pageComponents = new Page();
const componentHistory = [pageComponents];
const page = pageComponents.drawing(document.querySelector(".page-result"));
page.addEventListener("mousedown", () => {
    page.classList.add("preview");
});
page.addEventListener("mouseup", () => {
    page.classList.remove("preview");
});
// ajout de l'index du composant page
page.setAttribute("data-index", "0");
// affichage des composants
for (const ComponentList in ComponentsMap["ComponentsMap"]) {
    const list = document.createElement("div");
    list.classList.add("Together", "flex-row", "align-center");
    list.innerHTML = `<p>${ComponentList}</p>`;
    if (ComponentsMap["ComponentsMap"][ComponentList].icon !== null)
        list.innerHTML += ComponentsMap["ComponentsMap"][ComponentList].icon;
    // on permet de glisser les composants dans la page
    $(page).droppable(createDroppable());
    // permet de rendre le composant glissable
    $(list).draggable({
        helper: 'clone'
    });
    componentsContainer.append(list);
    // enregistrement des composants dans le gestionnaire de recherche
    searchComponent[ComponentList] = list;
}
// évenement de recherche
searchInput.addEventListener("input", () => {
    const research = searchInput.value.toLowerCase();
    let toShow = [];
    if (research.length == 0) {
        // on récupérère tous les composants
        toShow = Object.keys(searchComponent);
    }
    else
        toShow = Object.keys(searchComponent).filter((componentName) => componentName.toLowerCase().match(`^${research}.*`));
    for (const componentName in searchComponent) {
        // affiche / suppresion du composant dans la liste en fonction de son état trouvé
        if (toShow.includes(componentName))
            componentsContainer.append(searchComponent[componentName]);
        else
            searchComponent[componentName].remove();
    }
});
/**
 *  crée la configuration d'un élement droppable
 * @returns la configuration
 */
function createDroppable() {
    return {
        accept: '.Together',
        greedy: true,
        drop: function (event, ui) {
            const component = ComponentsMap["ComponentsMap"][ui.draggable.text()]["basic-create"]();
            // demande de la configuration du composant
            component.askContent(() => {
                // ajout du composant dans les enfants de son parent
                componentHistory[parseInt($(this).data("index"))].addChild(component);
                // sauvegarde du composant pour l'historique
                componentHistory.push(component);
                // dessin du composant 
                const drawedComponent = component.drawing($(this));
                drawedComponent.setAttribute("data-index", `${componentHistory.length - 1}`);
                if (component.ifComponentChild()) {
                    // transformation du composant en droppable
                    $(drawedComponent).droppable(createDroppable());
                }
            });
        }
    };
}
