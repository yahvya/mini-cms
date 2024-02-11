"use strict";
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
// ajout d'animation smooth
smoothAppearOn([".website"]);
