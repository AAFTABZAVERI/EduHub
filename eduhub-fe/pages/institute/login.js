import GoogleLogin from 'react-google-login';
import Router from 'next/router'
import axios from "axios"


export default function login(){

    const onSuccess = (response) => {
        console.log(response)
        sessionStorage.setItem("email", response.profileObj.email);
        sessionStorage.setItem("name", response.profileObj.name);
        sessionStorage.setItem("imageurl", response.profileObj.imageUrl);
        sessionStorage.setItem("googleId", response.googleId);
        sessionStorage.setItem("tokenID", response.tokenId);
        sessionStorage.setItem("accessToken", response.accessToken);
        axios.get('http://127.0.0.1:5000/institute-login', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("tokenID")}`
            }
        })
        .then(function (response) {
            console.log(response);
            sessionStorage.setItem("instituteId", response.data["Id"])
            sessionStorage.setItem("instituteName", response.data["instituteName"])
            sessionStorage.setItem("instituteDescription", response.data["instituteDescription"])
            Router.push('admin')
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const onFail = (response) => {
        console.log(response)
    }

    return(
        <div>
            <GoogleLogin
                clientId="1029920867014-8l02s0sh2ossi9sa06u83e09o26elkpf.apps.googleusercontent.com"
                buttonText="Login to institite"
                onSuccess={onSuccess}
                onFailure={onFail}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}