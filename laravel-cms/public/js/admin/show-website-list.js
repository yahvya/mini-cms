"use strict";
// ajout d'animation smooth
smoothAppearOn([".website"]);
// ajout de l'évenement de mise à jour du thème
document.querySelectorAll(".website").forEach((website) => {
    let themeData = JSON.parse(website.getAttribute("data-theme"));
    const websiteId = parseInt(website.getAttribute("data-site"));
    website.querySelector(".update-theme-button").addEventListener("click", () => {
        showThemeModal(themeData, websiteId, (formModal) => {
            // envoi de la modification de thème
            const options = {
                method: "POST",
                body: new FormData(formModal)
            };
            fetch(changeThemeRoute, options)
                .then(response => response.json())
                .then(data => {
                token = data.nextToken;
                themeData = data.newThemeConfig;
                formModal.animate({ opacity: 0 }).addEventListener("finish", () => {
                    formModal.remove();
                });
                alert("theme mis à jour");
            })
                .catch(err => {
                console.log(err);
                alert("Une erreur s'est produite, veuillez recharger la page");
            });
        });
    });
});
/**
 * met à jour les données d'un thème
 * @param themeData configuration de base du thème
 * @param websiteId id du site
 * @param toDoOnSubmit l'action à faire
 */
function showThemeModal(themeData, websiteId, toDoOnSubmit) {
    const formModal = document.createElement("form");
    formModal.classList.add("form-modal", "modal", "flex-column", "align-center");
    formModal.innerHTML = `
            <i class="fa-solid fa-xmark"></i>
            <p class="text-center">Modifier le thème</p>
            <div class="content"></div>
            <input type="hidden" name="website-id" value="${websiteId}">
            <input type="hidden" name="_token" value="${token}">
            <button class="special-button filled-one" style="--width: 200px">Créer</button>
        `;
    formModal.querySelector("i").addEventListener("click", () => {
        formModal.animate({ opacity: 0 }, 400).addEventListener("finish", () => {
            formModal.remove();
        });
    });
    const contentContainer = formModal.querySelector(".content");
    // création des champs de sélection
    for (const varName in themeData) {
        const inputContainer = document.createElement("div");
        inputContainer.classList.add("input-container");
        inputContainer.innerHTML = `
                <input required type="color" name="${varName}" value="${themeData[varName]}">
            `;
        contentContainer.append(inputContainer);
    }
    formModal.addEventListener("submit", (e) => {
        e.preventDefault();
        toDoOnSubmit(formModal);
    });
    document.body.append(formModal);
}
/**
 * ajoute l'animation d'apparition smooth sur les sélecteurs données
 * @param selectors {Array} liste de sélecteurs css
 * @param customOptions {Object} options de l'observer
 */
function smoothAppearOn(selectors, customOptions = null) {
    const options = customOptions ?? {
        rootMargin: "0px",
        treshold: 1
    };
    // création de l'observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting)
                entry.target.classList.add("visible");
            else
                entry.target.classList.remove("visible");
        });
    }, options);
    // démarrage de l'observation
    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add("smooth-appear");
            observer.observe(element);
        });
    });
}
