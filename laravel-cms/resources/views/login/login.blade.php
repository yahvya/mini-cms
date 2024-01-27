@extends("global")

@section("title","Mini cms - Connexion")

@section("meta")
    <meta name="description" content="Mini cms - Connectez vous">
@endsection

@section("css")
    <link rel="stylesheet" href="{{ asset("css/login.css")  }}">
@endsection

@section ("body")
    <form action="{{ route("login.validate")  }}" method="post" class="login-form">
        <img src= "{{ asset("images/icon.png") }}" alt="icon de site">

        <div>
            <h2>Mini cms</h2>

            <p>Pas de compte ? <a href="{{ route("register.register")  }}">Inscrivez-vous</a></p>

            @if(Session::has("login-error") )
                <p>{{ Session::get("login-error") }}</p>
            @elseif($errors->any() )
                <p>Veuillez remplir tous les champs du formulaire</p>
            @endif
        </div>

        <div class="input-container">
            <i class="fa-solid fa-envelope"></i>
            <input type="email" placeholder="email" name="email" required value="{{ old("email")  }}">
        </div>

        <div class="input-container">
            <i class="fa-solid fa-lock"></i>
            <input type="password" placeholder="mot de passe" name="password" required>
        </div>

        <button class="special-button filled-one" style="--width: 300px">Connexion</button>

        @csrf
    </form>
@endsection

