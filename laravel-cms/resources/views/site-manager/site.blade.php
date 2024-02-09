@extends("global")

@section("title", "nouveau site")

@section("css")
    <link rel="stylesheet" href="{{ asset("css/site-manager/site.css") }}">
@endsection

@section("js")
    <script src=" {{asset("js/site-manager/site.js")}}" defer type="module"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
@endsection

@section("body")
    <form method="post" action="{{route("mon-site")}}" class="actions-container flex-column">
        <div class="input-container">
            <input type="text" name="site-name" placeholder="Entrez le nom du site" required>
        </div>

        <div class="input-container">
            <p>Couleur du texte</p>
            <input type="color" name="Text-color" required>
        </div>

        <div class="input-container">
            <p>Couleur du fond de la page</p>
            <input type="color" name="Background-page" required>
        </div>

        <div class="input-container">
            <p>Couleur des séparations des sections</p>
            <input type="color" name="Separation-color" required>
        </div>

        <div class="flex-row justify-center align-center">
            <button class="special-button define-article-template">Définir le template des articles</button>
            <button class="special-button add-page">Ajouter une page</button>
            <button class="special-button validate-site">Valider le site</button>
        </div>

        @csrf
    </form>

    <div id="page-container" class="flex-row">
        <div class="Components flex-column align-center">
            <input class="search" type="Text" placeholder="Choisir un composant" autocomplete="off">
        </div>


        <div class="page-result">
            <div>
                <div class="input-container">
                    <input type="text" name="page-title" placeholder="Entrez le titre de la page">
                </div>

                <div class="input-container">
                    <input type="text" name="page-link" placeholder="Entrez l'url de la page">
                </div>
            </div>
            <button class="special-button validate-page">Valider la page</button>
        </div>

        <div class="history"></div>
    </div>
@endsection
