import { getSession } from 'next-auth/client';
<<<<<<< HEAD
import styles from '../styles/Home.module.css';
=======
import styles from '../styles/dashboard.module.css';
import { signOut } from 'next-auth/client';

>>>>>>> c0e27ad7c9e69d968eadb446faadbca11df8499a

export default function Dashboard({ user }) {
  return (
<<<<<<< HEAD
    <div className={styles.container}>
=======
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
>>>>>>> c0e27ad7c9e69d968eadb446faadbca11df8499a
      <p>
        Welcome to Eduhub: <b>{user.name}</b>
      </p>
      <p>{user.email}</p>
<<<<<<< HEAD
=======
      <button className={styles.primaryButton} onClick={() => signOut()}>
        Sign Out
      </button>
      

>>>>>>> c0e27ad7c9e69d968eadb446faadbca11df8499a
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