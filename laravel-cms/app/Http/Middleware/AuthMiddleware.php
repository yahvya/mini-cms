<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use \Closure;

class AuthMiddleware{
    public function handle(Request $request,Closure $next):Response{
        if(!$request->session()->has("wuser") ) return redirect()->route("login.login");

        return $next($request);
    }
}
