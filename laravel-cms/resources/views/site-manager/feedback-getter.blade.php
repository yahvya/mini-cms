<div class="feedback-article-zone flex-row align-start">
    <div class="feedback-zone">
        <form method="post" action="{{ route("add-feedback",["websiteName" => $websiteName,"articleId" => $articleId]) }}" class="feedback-getter">
            <p class="text-upper">Commentaires</p>

            <div class="input-container">
                <input type="text" placeholder="Nom prénom" name="username" required>
            </div>

            <div class="input-container">
                <textarea required name="feedback" placeholder="Entrez votre commentaire" minlength="10" maxlength="250"></textarea>
            </div>

            <button class="special-button">Envoyer le commentaire</button>

            @csrf
        </form>

        @if(Session::has("feedback.success") )
            <p>{{ Session::get("feedback.success") }}</p>
        @endif
    </div>

    <details class="articles-list" open>
        <summary class="text-upper">Articles</summary>

        <ul>
            @foreach($articles as $article)
                <li><a href="{{ route("showArticle",["websiteName" => $websiteName,"articleId" => $article->id]) }}" target="_blank">{{ json_decode($article->contenu)->title }}</a></li>
            @endforeach
        </ul>
    </details>
</div>

<p class="text-upper">Commentaires des utilisateurs</p>

<div class="feedbacks-list">
    @foreach($feedbacks as $feedback)
        @if($feedback["status"])
            <div class="comment">
                <p class="title">Commentaire de {{ $feedback->user_name  }}</p>
                <p>{{ $feedback->contenu }}</p>
            </div>
        @endif
    @endforeach
</div>
