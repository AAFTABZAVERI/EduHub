
import { getSession } from 'next-auth/client';
import styles from '../styles/Home.module.css';
import {  signOut } from 'next-auth/client';

export default function Homescreen({ user }) {
  return (
    <div className={styles.container}>
      <h1>EduHub Dashboard</h1>
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