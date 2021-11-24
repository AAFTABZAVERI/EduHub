import { GoogleLogin, GoogleLogout } from 'react-google-login';
// import { NextResponse, NextRequest } from 'next/server'
import Router from 'next/router'
const axios = require('axios');
import { useGoogleLogin } from 'react-google-login'


export default function glogin(){

    const responseGoogle = (response) => {
        console.log(response);
        sessionStorage.setItem("email", response.profileObj.email);
        sessionStorage.setItem("name", response.profileObj.name);
        sessionStorage.setItem("imageurl", response.profileObj.imageUrl);
        sessionStorage.setItem("googleId", response.googleId);
        sessionStorage.setItem("tokenID", response.tokenId);
        sessionStorage.setItem("accessToken", response.accessToken);
        
        let Token = {
          tokenId: response.tokenId
        }

        axios.post('http://127.0.0.1:5000/tokenApi', {
          tokenId: response.tokenId,
        })
        .then(function (response) {
          console.log(response);
          Router.push('/dashboard')
        })
        .catch(function (error) {
          console.log(error);
        });

        // fetch('http://127.0.0.1:5000/tokenApi', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(Token),
        // }).then(function (response){
        //   console.log(response)
        // })

        // return NextResponse.redirect('/dashboard')
      }
      

    return (
        <div>
             <GoogleLogin
    clientId="1029920867014-8l02s0sh2ossi9sa06u83e09o26elkpf.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
    // uxMode = 'redirect'
    redirectUri='http://localhost:3000/dashboard'
  />
        </div>
    )
}
