import { useState,useEffect } from 'react';
import style from '../styles/Home.module.css';
import styles from '../styles/dashboard.module.css';
import NavBar from '../components/navbar';


export default function Dashboard() {
  return (

    <div className={style.container}>
      {/* <div className={styles.navbar}>
        <a> Home </a>
        <div className={styles.navCentered}>
          <a> EduHub Dashboard</a>
        </div>
        <div className={styles.navbarRight}>
          <a>{name}</a>
          <button className={styles.btn}>
              Sign Out
          </button>
        </div>
      </div> */}
      <NavBar />
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <div className={styles.class}>
            <img className={styles.subjectImg} src="/subject1.jpg"/>
            <div className={styles.other}>
              <p className={styles.title}> Enterprise computing </p>
              <p className={styles.prof}>Prof. PM Jatt</p>
              <div className={styles.desc}>
                <p className={styles.desc}>  consectetur adipiscing elit,Lorem ipsum dolor  sit amet, consectetur  </p>
              </div>
            </div>
            <div>
              <img className={styles.dots} src="/three-dots.png"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

