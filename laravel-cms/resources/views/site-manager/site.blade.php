@extends("global")

@section("title", "nouveau site")

@section("css")
    <link rel="stylesheet" href="{{ asset("css/site-manager/site.css") }}">
@endsection

@section("js")
    <script src=" {{asset("js/site-manager/site.js")}}" defer type="module"></script>
@endsection

@section("body")
    <div id="page" class="flex-row">
        <div class="Components flex-column align-center">
            <input class="search" type="Text" placeholder="Choisir un composant">
        </div>

        <div class="page-result"></div>

        <div class="history"></div>
    </div>
@endsection
