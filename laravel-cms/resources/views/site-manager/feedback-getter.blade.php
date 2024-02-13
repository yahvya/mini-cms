<form method="post" action="{{ route("add-feedback",["websiteName" => $websiteName,"articleId" => $articleId]) }}" class="feedback-getter">
    <p>Commentaires</p>

    <div class="input-container">
        <input type="text" placeholder="Nom prénom" name="username" required>
    </div>

    <div class="input-container">
        <textarea required name="feedback" placeholder="Entrez votre commentaire" minlength="10" maxlength="250"></textarea>
    </div>

    <button class="special-button">Envoyer le commentaire</button>

    @csrf
</form>
