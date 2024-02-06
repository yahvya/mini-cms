@extends("global")

@section("title","Vos sites - Mini cms")

@section("css")
    <link rel="stylesheet" href="{{ asset("css/site-manager/show-website-list.css")  }}">
@endsection

@section("js")
    <script src="{{ asset("js/site-manager/show-website-list.js")  }}" defer></script>
@endsection

@section("body")
    <div class="websites-choose-zone flex-column align-center">
        <p class="text-center title text-upper">Liste de vos sites</p>

        @foreach($websites as $website)
            <div class="website flex-row justify-between">
                <p>{{ $website->website_name }}</p>
                <a href="#" class="special-button">Gérer le site</a>
            </div>
        @endforeach

        <a href="{{route("admin3.home")}}" class="special-button">Créer un nouveau site</a>
    </div>
@endsection
