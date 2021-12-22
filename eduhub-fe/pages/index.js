import GoogleLogin from 'react-google-login';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Router from 'next/router'
import axios from "axios"

// const axios = require('axios');

export default function Home() {
  //const [session, loadingSession] = useSession();
  const responseGoogle = (response) => {
    console.log(response);
    sessionStorage.setItem("email", response.profileObj.email);
    sessionStorage.setItem("name", response.profileObj.name);
    sessionStorage.setItem("imageurl", response.profileObj.imageUrl);
    sessionStorage.setItem("googleId", response.googleId);
    sessionStorage.setItem("tokenID", response.tokenId);
    sessionStorage.setItem("accessToken", response.accessToken);

    axios.get('http://127.0.0.1:5000/tokenApi', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tokenID")}`
      }
    })
    .then(function (response) {
      sessionStorage.setItem("Id", response.data[0].Id)
      sessionStorage.setItem("instituteId", response.data[0].instituteId)
      sessionStorage.setItem("user", response.data[0].user)
      if(response.data[0].user == "faculty"){
        Router.push('/faculty-dashboard')
      }
      else if (response.data[0].user == "student") {
        Router.push('/dashboard')
      } else {
        alert("No user found in any institute with provided email")
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Google Authentication</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GoogleLogin
        clientId="1029920867014-8l02s0sh2ossi9sa06u83e09o26elkpf.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}