<?php

namespace App\Http\Controllers;

use App\Models\UserModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class LoginController extends Controller
{
    public function validateLogin(Request $request){
        $datas = $request->validate([
            "email" => "required|email",
            "password" => "required"
        ]);

        $user = UserModel::where(["email" => $datas["email"]])->first();

        if($user !== null && password_verify($datas["password"],$user->password) ){
            $userDatas = $user->toArray();

            unset($userDatas["password"]);

            $request->session()->put('wuser', $userDatas);

            redirect()->route("");
        }

        Session::flash("login-error","Compte non trouvé");
        return redirect()->route("login.login");
    }
}
