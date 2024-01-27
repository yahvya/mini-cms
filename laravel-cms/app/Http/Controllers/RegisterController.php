<?php

namespace App\Http\Controllers;

use App\Models\UserModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class RegisterController extends Controller
{
    /**
     * confirme l'inscription de l'utilisateur
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function validateRegistration(Request $request){
        $datas = $request->validate([
            "username" => "required",
            "userfirstname" => "required",
            "email" => "required|email",
            "password" => "required"
        ]);

        // on vérifie l'existance de l'utilisateur
        if(UserModel::where(["email" => $datas["email"] ])->first() !== null){
            Session::flash("registration-error","L'email fourni est déjà associé à un compte");
            return redirect()->route("register.register");
        }
        else{
            // création de l'utilisateur
            $user = new UserModel();

            $user->username = $datas["username"];
            $user->userfname = $datas["userfirstname"];
            $user->email = $datas["email"];
            $user->password = password_hash($datas["password"],PASSWORD_BCRYPT);

            $user->save();

            return redirect()->route("login.login");
        }
    }
}
