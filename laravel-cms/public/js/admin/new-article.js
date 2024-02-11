import { page, pageComponents, createDroppable, componentHistory, updateHistory } from "./page-container.js";
import { componentsMap } from "../components/ComponentRegistration.js";
// création de la page à partir des articles contenus
pageComponents.createFrom(componentsMap, article["page-content"]);
// suppression de la page par défaut crée
page.remove();
// affichage de la page contenant le template du précédent article
const newPage = pageComponents.drawing(document.querySelector(".page-result .first-container"));
newPage.setAttribute("data-index", "0");
pageComponents.setAsUpdatable();
// ajout des élements dans l'historique
fillHistoryFrom(pageComponents);
updateHistory();
$(newPage).droppable(createDroppable());
// gestion du formulaire
const form = document.querySelector("#new-article");
// ajout des données de la page dans le formulaire
form.addEventListener("submit", () => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "new-article";
    input.value = JSON.stringify(pageComponents.exportComponent());
    form.append(input);
});
/**
 *
 * @param component le composant dont les enfants sont à ajouter (ignoré)
 */
function fillHistoryFrom(component) {
    if (!component.ifComponentChild())
        return;
    component.getChildren().forEach(child => {
        const element = child.getElement();
        // ajout dans l'historique
        componentHistory.push(child);
        element.setAttribute("data-index", `${componentHistory.length - 1}`);
        if (child.ifComponentChild()) {
            fillHistoryFrom(child);
            $(element).droppable(createDroppable());
        }
    });
}
