@extends('global')
@section('title','Liste des articles')
@section("css")
    <link rel="stylesheet" href="{{ asset("css/site/admin/show-website-list.css")  }}">
@endsection

@section("body")
    <div class="websites-choose-zone flex-column align-center">
        <p class="text-center title text-upper">Liste de vos articles</p>

        @foreach($Articles as $article)
            <div class="website flex-row justify-between">
                <p>{{ json_decode($article->contenu)->title }}</p>

                <div class="flex-row align-center">
                    <a href="{{ route("deleteArticle",["websiteId" => $article->id_1,"articleId" => $article->id]) }}" class="special-button" title="Supprimer"><i class="fa-solid fa-trash"></i></a>
                    <a href="{{ route("seeComments",["websiteId" => $article->id_1,"articleId" => $article->id]) }}" class="special-button" title="Voir les commentaires"><i class="fa-solid fa-comment"></i></a>
                </div>
            </div>
        @endforeach

        <a href="{{route("admin.manage",["websiteId" => $websiteId])}}" class="special-button">Créer un nouvel article</a>
    </div>
@endsection
