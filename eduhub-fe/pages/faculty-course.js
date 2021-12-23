import axios from 'axios';
import React from 'react';
import { useEffect, useRef, useState } from "react";
import NavBar from '../components/navbar';
import styles from '../styles/course.module.css';
import FacultyAssignmentComponent from './facultyComponents/FacultyAssignmentComponent';
import FacultyMaterialComponent from './facultyComponents/FacultyMaterialComponent';

export default function course() {

    const [materialData, setmaterialData] = useState(0)
    const [assignmentData, setassignmentData] = useState(0)
    const [courseName, setcourseName] = useState(0)
    const [courseDesc, setcourseDesc] = useState(0)
    const [quizData, setQuizdata] = useState(0)

    useEffect(() => {
        setcourseName(sessionStorage.getItem("courseName"))
        setcourseDesc(sessionStorage.getItem("courseDesc"))

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

        axios.get('http://127.0.0.1:5000/faculty-quiz/'+sessionStorage.getItem("Id"),{
            params:{
                "courseId" : sessionStorage.getItem("courseId")
            }
        })
        .then(function (response) {
            setQuizdata(response.data)
            console.log(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });

        axios.get('http://127.0.0.1:5000/faculty-assignment/'+sessionStorage.getItem("Id"),{
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

    function addAssignment(){
        var assignmentName = document.getElementById("AssignmentName").value;
        var assignmentDescription = document.getElementById("AssignmentDescription").value;
        var assignmentData = document.getElementById("AssignmentDate").value;
        console.log(assignmentData)
        var formData = new FormData();
        var file = document.getElementById("AssignmentFile");
        formData.append("file", file.files[0]);
        formData.append("assignmentName", assignmentName)
        formData.append("assignmentDate", assignmentData)
        formData.append("assignmentDescription", assignmentDescription)
        formData.append("courseId", sessionStorage.getItem("courseId"))

        axios.post('http://127.0.0.1:5000/faculty-assignment/'+sessionStorage.getItem("Id"), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
        }})
        .then(function (response) {
            setassignmentData(response.data)
            console.log(response.data)
            let assignmentModal = document.getElementById("assignmentModal")
            assignmentModal.style.display = "none"
        })
        .catch(function (error) {
          console.log(error);
        });
    }
   
    

    function addQuiz(){
        var title = document.getElementById("Title").value;
        var link = document.getElementById("Link").value;
        
        axios.post('http://127.0.0.1:5000/faculty-quiz/'+sessionStorage.getItem("Id"),  {
           "link":link,
           "title":title,
           "courseId":sessionStorage.getItem("courseId")
        })
        .then(function(responce){
            setQuizdata(responce.data)
            console.log(responce.data)
            let quizModal = document.getElementById("quizModal")
            quizModal.style.display="none"
        })
        .catch(function (error) {
            console.log(error);
          });

    }

    function redirecturl(url){    
        let newurl = "https://"+ url
        window.open(newurl)
    }

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
                            <FacultyMaterialComponent Id={material.Id} title={material.title} description={material.description} fileName={material.fileName} url={material.url}></FacultyMaterialComponent>
                        )): 
                        <div>Fettching data..</div>}
                        <button className={styles.add} onClick={() => modelOpen("material")}>+ Add Topic</button>
                        
                        <hr />
                    </div>
                </div>

{/* This is the Assignment fetching area */}
                <div className={styles.right}>
                    <div className={styles.card1}> 
                        <h3>Assignments </h3>
                        {assignmentData && assignmentData.map((assignment) => (
                            <FacultyAssignmentComponent Id={assignment.Id} title={assignment.title} description={assignment.description} fileName={assignment.fileName} url={assignment.url}></FacultyAssignmentComponent>
                        ))}
                        <button  onClick={() => modelOpen("assignment")}>+</button>
                    </div>

{/* This is the Quiz fetching area */}
                    <div className={styles.card2}> 
                        <h3>Quizzes </h3>
                        {quizData ? quizData.map((quiz) => ( 
                            <p  onClick={()=>redirecturl(quiz.link)} >{quiz.title}</p>
                        )): 
                        <div>Fettching data..</div>}
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
                    <p style={{display:"inline-block", marginRight:"5px"}}>Assignment Name : </p>
                    <input type="text" name='AssignmentName' id='AssignmentName'></input><br></br>
                    <p style={{display:"inline-block", marginRight:"5px"}}>Assignment Description : </p>
                    <input type="text" name='AssignmentDescription' id='AssignmentDescription'></input><br></br>
                    <p style={{display:"inline-block", marginRight:"5px"}}>Assignment File : </p>
                    <input type="file" id="AssignmentFile"></input><br></br>
                    <p style={{display:"inline-block", marginRight:"5px"}}>Submission Deadline : </p>
                    <input type="datetime-local" id='AssignmentDate'></input><br></br>
                    <button onClick={addAssignment}>Add Assignment</button>
                    
                </div>
            </div>
            <div id="quizModal" className={styles.modal}>
                <div class={styles.modalContent}>
                    <span class={styles.close} onClick={modelClose}>&times;</span>
                    {/* <h2>Add Quiz</h2>
                    <p>Some text in the Modal..</p> */}
                    <p style={{display:"inline-block", marginRight:"5px"}}>Quiz Title : </p>
                    <input type="text" name="Title" id="Title"></input><br></br>
                    <p style={{display:"inline-block", marginRight:"5px"}}>Form Link : </p>
                    <input type = "text" name="Link" id="Link"></input><br></br>
                    <button onClick={addQuiz}>Add Quiz</button>
                </div>
            </div>
            
        </div>
    )
}
