@extends("global")

@section("title", "nouveau site")

@section("css")
    <link rel="stylesheet" href="{{ asset("css/site/admin/site-builder.css") }}">
@endsection

@section("js")
    <script src=" {{asset("js/admin/site.js")}}" defer type="module"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
@endsection

@section("body")
    @if(Session::has("site-error") )
        <p>{{ Session::get("site-error") }}</p>
    @endif

    <form method="post" action="{{route("mon-site")}}" class="actions-container flex-column">
        <div class="input-container">
            <input type="text" name="site-name" placeholder="Entrez le nom du site" required>
        </div>

        <div class="input-container">
            <p>Couleur du texte</p>
            <input type="color" name="Text-color" required autocomplete="off">
        </div>

        <div class="input-container">
            <p>Couleur du fond de la page</p>
            <input type="color" name="Background-page" required autocomplete="off">
        </div>

        <div class="input-container">
            <p>Couleur des séparations des sections</p>
            <input type="color" name="Separation-color" required autocomplete="off">
        </div>

        <div class="flex-row justify-center align-center">
            <button type="button" class="special-button define-article-template">Définir le template des articles</button>
            <button type="button" class="special-button add-page">Ajouter une page</button>
            <button class="special-button validate-site">Valider le site</button>
        </div>

        @csrf
    </form>

    @include("site-manager/page-container-layout",["includeWithLinkRequirement" => true])
@endsection
