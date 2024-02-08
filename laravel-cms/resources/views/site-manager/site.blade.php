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
    <div id="page-container" class="flex-row">
        <div class="Components flex-column align-center">
            <input class="search" type="Text" placeholder="Choisir un composant" autocomplete="off">
        </div>


        <div class="page-result"></div>

        <div class="history"></div>
    </div>
@endsection
