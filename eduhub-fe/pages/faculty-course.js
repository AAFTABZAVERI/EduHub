import axios from 'axios';
import React from 'react';
import { useEffect, useRef, useState } from "react";
import NavBar from '../components/navbar';
import styles from '../styles/course.module.css';
import FacultyMaterialComponent from './facultyComponents/FacultyMaterialComponent';

export default function course() {

    const [materialData, setmaterialData] = useState(0)

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/faculty-material/'+sessionStorage.getItem("Id"),{
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

    function modelOpen(type){
        if(type == "material"){
            let materialModal = document.getElementById("materialModal")
            materialModal.style.display = "block"
        }
        else if(type == "assignment"){
            let assignmentModal = document.getElementById("assignmentModal")
            assignmentModal.style.display = "block"
        }
        else if(type == "quiz"){
            let quizModal = document.getElementById("quizModal")
            quizModal.style.display = "block"
        }
    }

    function modelClose(){
        let materialModal = document.getElementById("materialModal")
        materialModal.style.display = "none"
        let assignmentModal = document.getElementById("assignmentModal")
        assignmentModal.style.display = "none"
        let quizModal = document.getElementById("quizModal")
        quizModal.style.display = "none"
    }

    function addMaterial(){
        var materialName = document.getElementById("MaterialName").value;
        var materialDescription = document.getElementById("MaterialDescription").value;
        var formData = new FormData();
        var file = document.getElementById("MaterialFile");
        formData.append("file", file.files[0]);
        formData.append("materialName", materialName)
        formData.append("materialDescription", materialDescription)
        formData.append("courseId", sessionStorage.getItem("courseId"))

        axios.post('http://127.0.0.1:5000/faculty-material/'+sessionStorage.getItem("Id"), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }})
        .then(function (response) {
            setmaterialData(response.data)
            console.log(response.data)
            let materialModal = document.getElementById("materialModal")
            materialModal.style.display = "none"
        })
        .catch(function (error) {
          console.log(error);
        });
    }
   
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
                            <FacultyMaterialComponent Id={material.Id} title={material.title} description={material.description} fileName={material.fileName} url={material.url}></FacultyMaterialComponent>
                        )): <div>Fettching data..</div>}
                        <button className={styles.add} onClick={() => modelOpen("material")}>+ Add Topic</button>
                        
                        <hr />
                    </div>
                </div>

{/* This is the Assignment fetching area */}
                <div className={styles.right}>
                    <div className={styles.card1}> 
                        <h3>Assignments </h3>
                        <p>Assignment 1</p>
                        <p>Assignment 2</p>
                        <button  onClick={() => modelOpen("assignment")}>+</button>
                    </div>

{/* This is the Quiz fetching area */}
                    <div className={styles.card2}> 
                        <h3>Quizzes </h3>
                        <p>Quiz 1</p>
                        <p>Quiz 2</p>
                        <button  onClick={() => modelOpen("quiz")}>+</button>
                    </div>
                </div>
            </div>

{/* This is the all modal area */}
            <div id="materialModal" className={styles.modal}>
                <div class={styles.modalContent}>
                    <span class={styles.close} onClick={modelClose}>&times;</span>
                    <h2>Add Material</h2>
                    <p style={{display:"inline-block", marginRight:"5px"}}>Material Name : </p>
                    <input type="text" name='MaterialName' id='MaterialName'></input><br></br>
                    <p style={{display:"inline-block", marginRight:"5px"}}>Material Description : </p>
                    <input type="text" name='MaterialDescription' id='MaterialDescription'></input><br></br>
                    <p style={{display:"inline-block", marginRight:"5px"}}>Material File : </p>
                    <input type="file" id="MaterialFile"></input><br></br>
                    <button onClick={addMaterial}>Add Course</button>
                </div>
            </div>
            <div id="assignmentModal" className={styles.modal}>
                <div class={styles.modalContent}>
                    <span class={styles.close} onClick={modelClose}>&times;</span>
                    <h2>Add Assignment</h2>
                    <p>Some text in the Modal..</p>
                </div>
            </div>
            <div id="quizModal" className={styles.modal}>
                <div class={styles.modalContent}>
                    <span class={styles.close} onClick={modelClose}>&times;</span>
                    <h2>Add Quiz</h2>
                    <p>Some text in the Modal..</p>
                </div>
            </div>
            
        </div>
    )
}
