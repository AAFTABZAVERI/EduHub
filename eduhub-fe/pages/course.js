import axios from 'axios';
import React from 'react';
import { useEffect, useRef, useState } from "react";
import NavBar from '../components/navbar';
import styles from '../styles/course.module.css';
import StudentMaterialComponent from './studentComponents/StudentMaterialComponent';

export default function course() {

    const [materialData, setmaterialData] = useState(0)

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/student-material/'+sessionStorage.getItem("Id"),{
            params:{
                "courseId" : sessionStorage.getItem("courseId")
            }
        })
        .then(function (response) {
            setmaterialData(response.data)
            console.log(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
        
    }, [])
   
    return (
        <div>
            <NavBar />
            <div  className={styles.heading}>
                <h1>SUBJECT/COURSE NAME</h1>
                <p>Description Description Description Description Description Description Description</p>
            </div>


{/* This is the Material fetching area */}
            <div>
                <div className={styles.left}>
                    <div className={styles.chapter}>
                        <h2> Course Materials</h2>
                        {materialData ? materialData.map((material) => ( 
                            <StudentMaterialComponent Id={material.Id} title={material.title} description={material.description} fileName={material.fileName} url={material.url}></StudentMaterialComponent>
                        )): <div>Fettching data..</div>}
                        <hr />
                    </div>
                </div>

{/* This is the Assignment fetching area */}
                <div className={styles.right}>
                    <div className={styles.card1}> 
                        <h3>Assignments </h3>
                        <p>Assignment 1</p>
                        <p>Assignment 2</p>
                    </div>

{/* This is the Quiz fetching area */}
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
