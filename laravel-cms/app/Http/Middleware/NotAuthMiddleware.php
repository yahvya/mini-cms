<?php

namespace App\Http\Middleware;

// middleware

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class NotAuthMiddleware{
    public function handle(Request $request,Closure $next):Response{
        if($request->session()->has("wuser") ) return redirect()->route("admin.home");

        return $next($request);
    }
}
