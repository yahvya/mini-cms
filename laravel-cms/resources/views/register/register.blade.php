@extends("global")

@section("title","Mini cms - Inscription")

@section("meta")
    <meta name="description" content="Mini cms - Inscrivez-vous">
@endsection

@section("css")
    <link rel="stylesheet" href="{{ asset("css/login.css")  }}">
@endsection

@section ("body")
    <form action="#" method="post" class="login-form">
        <img src= "{{ asset("images/icon.png") }}" alt="icon de site">

        <div>
            <h2>Mini cms</h2>

            <p>Déjà un compte ? <a href="{{ route("login.login")  }}">Connectez-vous</a></p>
        </div>

        <div class="input-container">
            <i class="fa-solid fa-user"></i>
            <input type="text" name="username" placeholder="nom" required>
        </div>

        <div class="input-container">
            <i class="fa-solid fa-user"></i>
            <input type="text" name="userfirstname" placeholder="prénom" required>
        </div>

        <div class="input-container">
            <i class="fa-solid fa-envelope"></i>
            <input type="email" placeholder="email" required>
        </div>

        <div class="input-container">
            <i class="fa-solid fa-lock"></i>
            <input type="password" placeholder="mot de passe" required>
        </div>

        <button class="special-button filled-one" style="--width: 300px">Inscription</button>

        @csrf
    </form>
@endsection

