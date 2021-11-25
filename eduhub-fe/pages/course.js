import React from 'react';
import NavBar from '../components/navbar';
import styles from '../styles/course.module.css';

export default function course() {
    return (
        <div>
            <NavBar />
            <center><h1 className={styles.heading}>SUBJECT/COURSE NAME</h1> </center>
            <div>
                <div className={styles.left}>
                    <div className={styles.chapter}>
                        <h2> Chapter number:</h2>
                        <p className={styles.p}> Topic 1: any kind of description</p>
                        <p className={styles.p}> Topic 2: any kind of description</p>
                        <p className={styles.p}> Topic 3: any kind of description</p>
                        <hr />
                    </div>

                    <div className={styles.chapter}>
                        <h2> Chapter number:</h2>
                        <p className={styles.p}> Topic 1: any kind of description</p>
                        <p className={styles.p}> Topic 2: any kind of description</p>
                        <p className={styles.p}> Topic 3: any kind of description</p>
                        <hr />
                    </div>

                    <div className={styles.chapter}>
                        <h2> General </h2>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.card1}> Assignments </div>
                    <div className={styles.card2}> Quizzes </div>
                </div>
            </div>
        </div>
    )
}
