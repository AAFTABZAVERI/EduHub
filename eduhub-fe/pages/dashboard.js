import style from '../styles/Home.module.css';
import styles from '../styles/dashboard.module.css';



export default function Dashboard({ user }) {
  return (

    <div className={style.container}>
      <div className={styles.navbar}>
        <a> Home</a>
        <div className={styles.navCentered}>
          <a> EduHub Dashboard</a>
        </div>
        <div className={styles.navbarRight}>
          <a>name</a>
          <button className={styles.btn}>
              Sign Out
          </button>
        </div>
      </div>
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <div className={styles.class}>
            <img src="/subject1.jpg"/>
            <p className={styles.title}> Class Name</p>
          </div>
          <div className={styles.desc}>
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   if (!session) {
//     context.res.writeHead(302, { Location: '/' });
//     context.res.end();
//     return {};
//   }
//   return {
//     props: {
//       user: session.user,
//     },
//   };
// }
