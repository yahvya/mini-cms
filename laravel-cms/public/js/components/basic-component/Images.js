import { BasicComponent } from "../BasicComponent.js";
/**
 * représente une image
 */
export class Images extends BasicComponent {
    /**
     * lien de l'image
     * @protected
     */
    src;
    /**
     * texte alternatif à l'image
     * @protected
     */
    alt;
    constructor() {
        super();
        this.name = "Image";
    }
    exportComponent() {
        return {
            componentName: this.name,
            src: this.src,
            alt: this.alt
        };
    }
    createFrom(componentsMap, component) {
        this.src = component.src;
        this.alt = component.alt;
        return this;
    }
    drawing(parent) {
        this.htmlElement = document.createElement("img");
        this.htmlElement.src = this.src;
        this.htmlElement.alt = this.alt;
        this.htmlElement.classList.add("special-image");
        parent.append(this.htmlElement);
        return this.htmlElement;
    }
    /**
     * met à jour le lien de l'image
     * @param src le lien de l'image
     */
    setSrc(src) {
        this.src = src;
    }
    /**
     * met à jour le texte alternatif
     * @param alt le texte alternatif
     */
    setAlt(alt) {
        this.alt = alt;
    }
    askContent(toExecOnValidate) {
        const modal = this.getModel();
        const contente = modal.querySelector(".content");
        contente.innerHTML = `
            <div class="input-container">
                <input type="text" name="alt" placeholder="Entrez le alt de l'image">
            </div>

            <div class="input-container">
                <input type="file" name="crc" accept="image/*"/>
            </div>

            <p class="text-center">Ou</p>

            <div class="input-container">
                <input type="text" name="src" placeholder="Lien de l'image"/>
            </div>

        `;
        modal.addEventListener("submit", () => {
            const alt = contente.querySelector("input[name=alt]");
            this.alt = alt.value;
            const src = contente.querySelector("input[name=src]");
            if (src.value.length == 0) {
                var reader = new FileReader();
                const fileSelector = contente.querySelector("input[name=crc]");
                reader.readAsDataURL(fileSelector.files[0]);
                reader.onload = () => {
                    this.src = reader.result;
                    toExecOnValidate();
                };
            }
            else {
                this.src = src.value;
                toExecOnValidate();
            }
            this.closeModal(modal);
        });
        document.body.append(modal);
    }
}
