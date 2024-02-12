<div id="page-container" class="flex-row">
    <div class="Components flex-column align-center">
        <input class="search" type="Text" placeholder="Choisir un composant" autocomplete="off">
    </div>

    <div class="page-result">
        <div class="first-container">
            <div class="input-container">
                <input type="text" name="page-title" placeholder="Entrez le titre de la page" required>
            </div>

            @if($includeWithLinkRequirement)
                <div class="input-container">
                    <input type="text" name="page-link" placeholder="Entrez l'url de la page">
                </div>
            @endif
        </div>
        <button class="special-button validate-page">Valider la page</button>
    </div>

    <div class="history flex-column align-center"></div>
</div>
