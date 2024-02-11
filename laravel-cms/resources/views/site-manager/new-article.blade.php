@extends('global')

@section('title','Nouveau article')

@section('css')
    <link rel="stylesheet" href="{{ asset("css/site-manager/nouveau-article.css") }}">
@endsection

@section('js')
{{-- charger le script apres la page--}}
<script src="{{ asset("js/site-manager/new-article.js") }}" defer type="module"></script>
@endsection


@section('body')
@if(Session::has("site-error") )
    <p>{{ Session::get("site-error") }}</p>
@endif

<form id = 'page' method="post" action="{{route("validateNewArticle",["websiteId" => $websiteId])}}">
    <div class="input-container">
        <input type="text" placeholder="Entrez le titre" name="title" required>
    </div>

    <div class="page-container"></div>

    <button class="special-button validation-button">Valider la création</button>
    @csrf
</form>

@endsection

@section('bodyJs')
<script>
    var article=JSON.parse(@json($article->contenu));
</script>
@endsection
