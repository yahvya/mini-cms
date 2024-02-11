import { page, pageComponents } from "./page-container.js";
const pageTitleContainer = document.querySelector("input[name=page-title]");
const pageLinkContainer = document.querySelector("input[name=page-link]");
const siteNameInput = document.querySelector("input[name=site-name]");
// donnée finale du site
const site = {
    articleTemplate: null,
    pages: []
};
// le type de page à définir
let isArticleTemplate = true;
page.addEventListener("mousedown", () => {
    page.classList.add("preview");
});
page.addEventListener("mouseup", () => {
    page.classList.remove("preview");
});
// évenement de validation d'une page crée
document.querySelector(".validate-page").addEventListener("click", () => {
    if (pageTitleContainer.value.length == 0) {
        showMessage("Veuillez donner un titre à cette page");
        return;
    }
    const pageDatas = {
        "title": pageTitleContainer.value,
        "page-content": pageComponents.exportComponent()
    };
    if (!isArticleTemplate) {
        pageDatas["pageLink"] = pageLinkContainer.value;
        site.pages.push(pageDatas);
    }
    else
        site.articleTemplate = pageDatas;
    resetPageCreation();
});
// évenements de changement d'actions
document.querySelector(".define-article-template").addEventListener("click", () => {
    isArticleTemplate = true;
    showMessage("Vous pouvez maintenant définir le tempate par défaut des articles");
    resetPageCreation();
});
document.querySelector(".add-page").addEventListener("click", () => {
    isArticleTemplate = false;
    showMessage("Vous pouvez maintenant créer votre page");
    resetPageCreation();
});
// évenement de validation du site
const form = document.querySelector(".actions-container");
form.addEventListener("submit", (e) => {
    if (siteNameInput.value.length == 0) {
        showMessage("Veuillez donner un nom au site");
        return;
    }
    if (site.articleTemplate == null) {
        e.preventDefault();
        showMessage("Veuillez définir le template par défaut des");
        return;
    }
    const siteDataInput = document.createElement("input");
    siteDataInput.type = "hidden";
    siteDataInput.name = "site";
    siteDataInput.value = JSON.stringify(site);
    form.append(siteDataInput);
});
/**
 * remet à zéro les données de page
 */
function resetPageCreation() {
    pageLinkContainer.value = "";
    pageTitleContainer.value = "";
    // on vide le composant page
    pageComponents.clearChildren();
    // on vide la page
    Array.from(page.children).forEach(child => child.remove());
}
/**
 * affiche le message
 * @param message le message
 */
function showMessage(message) {
    alert(message);
}
