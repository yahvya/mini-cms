@php use Illuminate\Support\Facades\Session; @endphp
@extends("global")

@section("title","Mini cms - Inscription")

@section("meta")
    <meta name="description" content="Mini cms - Inscrivez-vous">
@endsection

@section("css")
    <link rel="stylesheet" href="{{ asset("css/login.css")  }}">
@endsection

@section ("body")
    <form action="{{ route("register.validate")  }}" method="post" class="login-form">
        <img src= "{{ asset("images/icon.png") }}" alt="icon de site">

        <div>
            <h2>Mini cms</h2>

            <p>Déjà un compte ? <a href="{{ route("login.login")  }}">Connectez-vous</a></p>

            @if(Session::has("registration-error") )
                <p>{{ Session::get("registration-error") }}</p>
            @elseif($errors->any() )
                <p>Veuillez remplir tous les champs du formulaire</p>
            @endif
        </div>

        <div class="input-container">
            <i class="fa-solid fa-user"></i>
            <input type="text" name="username" placeholder="nom" required value="{{ old("username")  }}">
        </div>

        <div class="input-container">
            <i class="fa-solid fa-user"></i>
            <input type="text" name="userfirstname" placeholder="prénom" required value="{{ old("userfirstname")  }}">
        </div>

        <div class="input-container">
            <i class="fa-solid fa-envelope"></i>
            <input type="email" placeholder="email" name="email" required value="{{ old("email")  }}">
        </div>

        <div class="input-container">
            <i class="fa-solid fa-lock"></i>
            <input type="password" placeholder="mot de passe" name="password" required>
        </div>

        <button class="special-button filled-one" style="--width: 300px">Inscription</button>

        @csrf
    </form>
@endsection

