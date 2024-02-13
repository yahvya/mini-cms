<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="{{ asset("css/site/result.css")  }}">
    <link rel="icon" href="{{ route("site.logo",["websiteName" => $websiteName]) }}">
    <script src="{{ asset("js/result.js") }}" defer type="module"></script>
    <title>{{ $pageDatas["title"] }}</title>
</head>
<body>
    <img src="{{ route("site.logo",["websiteName" => $websiteName]) }}" alt="Logo" class="img-logo">

    <div class="result-container"></div>

    @if($addHistory)
        @include("site-manager.feedback-getter")
    @endif

    <style>
        :root {
            @foreach($colors as $variableName => $color)
                --{{ $variableName }}: {{ $color }};
            @endforeach
        }
    </style>

    <script>
        var page = @json($pageDatas["page-content"]);
        var prefix = "{!! $prefix !!}";
    </script>
</body>
</html>
