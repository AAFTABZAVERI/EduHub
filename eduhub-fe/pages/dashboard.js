
import { getSession } from 'next-auth/client';
// import { GoogleLogout } from 'react-google-login';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import styles from '../styles/dashboard.module.css';
import { signOut } from 'next-auth/client';


export default function Homescreen() {

  const logout = (response) => {
    console.log(response);
  }

  return (
    <div>
      <center><h2>EduHub Dashboard</h2> </center>

      <div className={styles.container}>
        <div className={styles.card}> Enterprise Computing 
        </div>
        <div className={styles.card}> Cloud Computing </div>
        <div className={styles.card}> MEP </div>
        <div className={styles.card}> DSS </div>
        <div className={styles.card}> Enterprise Computing </div>
        <div className={styles.card}> Cloud Computing </div>
        <div className={styles.card}> MEP </div>
        <div className={styles.card}> DSS </div>
      </div>
      <p>
        {/* Welcome to EduHub: <b>{user.name}</b> */}
      </p>
      {/* <p>{user.email}</p> */}
      <button className={styles.primaryButton} onClick={() => signOut()}>
        Sign Out
      </button>
      {/* <GoogleLogout
      clientId="1029920867014-8l02s0sh2ossi9sa06u83e09o26elkpf.apps.googleusercontent.com"
      buttonText="Logout"
      uxMode = 'redirect'
      redirectUri = 'http://localhost:3000/glogin'
      onLogoutSuccess={logout}
    >
    </GoogleLogout> */}

    </div>
  );
}
