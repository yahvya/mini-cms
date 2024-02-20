@extends("global")

@section("title","Vos sites - Mini cms")

@section("css")
    <link rel="stylesheet" href="{{ asset("css/site/admin/show-website-list.css")  }}">
@endsection

@section("js")
    <script src="{{ asset("js/admin/show-website-list.js") }}" defer></script>
@endsection

@section("body")
    <div class="websites-choose-zone flex-column align-center">
        <p class="text-center title text-upper">Liste de vos sites</p>

        @foreach($websites as $website)
            <div class="website flex-row justify-between align-center" data-theme="{{ json_encode($website["theme"])  }}" data-site="{{ $website["id"]  }}">
                <p>{{ $website["website_name"] }}</p>
                <div class="flex-row">
                    <button class="special-button update-theme-button">Gérer le thème</button>
                    <a href="{{  route("listeArtciles",["websiteId" => $website["id"]]) }}" target="_blank" class="special-button">Gérer les articles</a>
                </div>
            </div>
        @endforeach

        <a href="{{route("admin.new-website")}}" class="special-button">Créer un nouveau site</a>
    </div>
@endsection

@section("bodyJs")
    <script>
        var token = "{{csrf_token()}}"
    </script>
@endsection
