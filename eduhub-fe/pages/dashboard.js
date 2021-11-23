import { getSession } from 'next-auth/client';
import styles from '../styles/Home.module.css';

export default function Dashboard({ user }) {
  return (
    <div className={styles.container}>
      <p>
        Welcome to Eduhub: <b>{user.name}</b>
      </p>
      <p>{user.email}</p>
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