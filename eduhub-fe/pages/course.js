import React from 'react';
import { useEffect, useRef, useState } from "react";
import Modal from '../components/modalpopup';
import NavBar from '../components/navbar';
import styles from '../styles/course.module.css';

export default function course() {
    const [showModal, setShowModal] = useState(false);
    const [showTopicModal, setShowTopicModal] = useState(false);
    // course[]
    return (
        <div>
            <NavBar />
            <div  className={styles.heading}>
                <h1>SUBJECT/COURSE NAME</h1>
                <p>Description Description Description Description Description Description Description</p>
            </div>
            
            <div>
                <div className={styles.left}>
                    <div className={styles.chapter}>
                        <h2> Chapter number:</h2>
                        <p className={styles.p}> Topic 1: any kind of description</p>
                        <p className={styles.p}> Topic 2: any kind of description</p>
                        <p className={styles.p}> Topic 3: any kind of description</p>
                        <button className={styles.add} onClick={() => setShowTopicModal(true)}>+ Add Topic</button>
                        <Modal
                            onClose={() => setShowTopicModal(false)}
                            show={showTopicModal}
                            title="Add topic"
                        >
                                This is Add Topic Modal
                        </Modal>
                        <hr />
                    </div>

                    <div className={styles.chapter}>
                        <h2> Chapter number:</h2>
                        <p className={styles.p}> Topic 1: any kind of description</p>
                        <p className={styles.p}> Topic 2: any kind of description</p>
                        <p className={styles.p}> Topic 3: any kind of description</p>
                        <button className={styles.add} onClick={() => setShowTopicModal(true)}>+ Add Topic</button>
                        <Modal
                            onClose={() => setShowTopicModal(false)}
                            show={showTopicModal}
                            title="Add topic"
                        >
                                This is Add Topic Modal
                        </Modal>
                        <hr />
                    </div>

                    <div className={styles.chapter}>
                        <h2> General </h2>
                        <button className={styles.add} onClick={() => setShowTopicModal(true)}>+ Add Topic</button>
                        <Modal
                            onClose={() => setShowTopicModal(false)}
                            show={showTopicModal}
                            title="Add topic"
                        >
                                This is Add Topic Modal
                        </Modal>
                        <button className={styles.btn} onClick={() => setShowModal(true)}>+</button>
                        <Modal
                            onClose={() => setShowModal(false)}
                            show={showModal}
                            title="Add Chapter"
                        >
                                Add Chapters 
                        </Modal>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.card1}> 
                        <h3>Assignments </h3>
                        <p>Assignment 1</p>
                        <p>Assignment 2</p>
                    </div>
                    <div className={styles.card2}> 
                        <h3>Quizzes </h3>
                        <p>Quiz 1</p>
                        <p>Quiz 2</p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
