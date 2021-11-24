
import { getSession } from 'next-auth/client';
import styles from '../styles/dashboard.module.css';
import { signOut } from 'next-auth/client';


export default function Homescreen({ user }) {


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
        Welcome to EduHub: <b>{user.name}</b>
      </p>
      <p>{user.email}</p>
      <button className={styles.primaryButton} onClick={() => signOut()}>
        Sign Out
      </button>
      

    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    context.res.writeHead(302, { Location: '/' });
    context.res.end();
    return {};
  }
  return {
    props: {
      user: session.user,
    },
  };
}