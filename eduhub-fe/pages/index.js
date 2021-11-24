import GoogleLogin from 'react-google-login';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Router from 'next/router'
const axios = require('axios');

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