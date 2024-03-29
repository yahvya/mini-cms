@extends("global")

@section("title","Liste des sites")

@section("css")
    <link rel="stylesheet" href="{{ asset("css/site/admin/see-comments.css") }}">
@endsection

@section("body")
    <p class="title">Liste des commentaires</p>

    @foreach($comments as $comment)
        <div class="comment">
            <p><span>Utilisateur:</span> {{$comment->user_name}}</p>
            <p>{{ $comment->contenu }}</p>

            <a href="{{ route("admin.manage-comment",["websiteId" => $websiteId,"articleId" => $articleId,"commentId" => $comment->id])  }}" class="special-button">{{ $comment->status ? "Rendre invisible" : "Rendre visible" }}</a>
        </div>
    @endforeach
@endsection
