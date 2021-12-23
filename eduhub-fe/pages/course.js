import axios from 'axios';
import React from 'react';
import { useEffect, useRef, useState } from "react";
import NavBar from '../components/navbar';
import styles from '../styles/course.module.css';
import StudentAssignmentComponent from './studentComponents/StudentAssignmentComponent';
import StudentMaterialComponent from './studentComponents/StudentMaterialComponent';

export default function course() {

    const [materialData, setmaterialData] = useState(0)
    const [assignmentData, setassignmentData] = useState(0)
    const [courseName, setcourseName] = useState(0)
    const [courseDesc, setcourseDesc] = useState(0)

    useEffect(() => {
        setcourseName(sessionStorage.getItem("courseName"))
        setcourseDesc(sessionStorage.getItem("courseDesc"))

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

        axios.get('http://127.0.0.1:5000/student-assignment/'+sessionStorage.getItem("Id"),{
            params:{
                "courseId" : sessionStorage.getItem("courseId")
            }
        })
        .then(function (response) {
            setassignmentData(response.data)
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
                <h1>{courseName}</h1>
                <p>{courseDesc}</p>
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
                        {assignmentData && assignmentData.map((assignment) => (
                            <StudentAssignmentComponent Id={assignment.Id} title={assignment.title} description={assignment.description} fileName={assignment.fileName} url={assignment.url}></StudentAssignmentComponent>
                        ))}
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
