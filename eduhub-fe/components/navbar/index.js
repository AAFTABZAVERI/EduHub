import { useState,useEffect } from 'react';
import React from 'react';
import styles from './navbar.module.css';

export default function NavBar({user}) {
    const [name,setName] = useState(0);
  useEffect(() => {
    if (window) { 
      // set props data to session storage or local storage  
      setName(sessionStorage.getItem("name"));
    }
}, []);
    return (
        <div>
            <div className={styles.navbar}>
                <a href="dashboard"> Home </a>
                <div className={styles.navCentered}>
                    <a> EduHub Dashboard</a>
                </div>
                <div className={styles.navbarRight}>
                    <a>{name}</a>
                    <button className={styles.btn}>
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    )
}
