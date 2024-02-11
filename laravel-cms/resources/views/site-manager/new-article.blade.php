@extends('global')

@section('title','Nouveau article')

@section('css')
    <link rel="stylesheet" href="{{ asset("css/site/admin/site-builder.css") }}">
@endsection

@section('js')
    <script src="{{ asset("js/admin/new-article.js") }}" defer type="module"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
@endsection


@section('body')
@if(Session::has("site-error") )
    <p>{{ Session::get("site-error") }}</p>
@endif

<form id="new-article" method="post" action="{{route("validateNewArticle",["websiteId" => $websiteId])}}">
    @include("site-manager/page-container-layout",["includeWithLinkRequirement" => false])

    @csrf
</form>

@endsection

@section('bodyJs')
    <script>
        var article=JSON.parse(@json($article->contenu));
    </script>
@endsection
