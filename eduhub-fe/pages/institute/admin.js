
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/admin.module.css";

export default function admin(){
    const [instituteDesc, setinstituteDesc] = useState(0)
    const [instituteName, setinstituteName] = useState(0)
    const [students, setstudents] = useState(0)
    const [professors, setprofessors] = useState(0)

    const [formProfessors, setformProfessors] = useState("")
    const [formStudents, setformStudents] = useState("")
    
    useEffect(() => {
        setinstituteName(sessionStorage.getItem("instituteName"));
        setinstituteDesc(sessionStorage.getItem("instituteDescription"));
        axios.get('http://127.0.0.1:5000/institute-students/'+sessionStorage.getItem("instituteId"))
        .then(function (response) {
            setstudents(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });

        axios.get('http://127.0.0.1:5000/institute-professors/'+sessionStorage.getItem("instituteId"))
        .then(function (response) {
            setprofessors(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [])



    const addProfessors = () => {
        let professorArr = formProfessors.split(",");
        let professorArrTrim = [] 
        professorArr.forEach((e)=> professorArrTrim.push(e.trim()))

        axios.post('http://127.0.0.1:5000/institute-professors/'+sessionStorage.getItem("instituteId"),{
            "professors": professorArrTrim
        }
        )
        .then(function (response) {
            setprofessors(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const removeProfessors = () => {
        let professorArr = formProfessors.split(",");
        let professorArrTrim = [] 
        professorArr.forEach((e)=> professorArrTrim.push(e.trim()))

        axios.delete('http://127.0.0.1:5000/institute-professors/'+sessionStorage.getItem("instituteId"),{
            data:{
                "professors": professorArrTrim
            }
        }
        )
        .then(function (response) {
            setprofessors(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const addStudents = () => {
        console.log("working")
        let studentArr = formStudents.split(",");
        let studentArrTrim = [] 
        studentArr.forEach((e)=> studentArrTrim.push(e.trim()))

        axios.post('http://127.0.0.1:5000/institute-students/'+sessionStorage.getItem("instituteId"),{
            "students": studentArrTrim
        }
        )
        .then(function (response) {
            setstudents(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const removeStudents = () => {
        console.log("working")
        let studentArr = formStudents.split(",");
        let studentArrTrim = [] 
        studentArr.forEach((e)=> studentArrTrim.push(e.trim()))

        axios.delete('http://127.0.0.1:5000/institute-students/'+sessionStorage.getItem("instituteId"),{
            data: {
                "students":studentArrTrim
            }
        }
        )
        .then(function (response) {
            setstudents(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return(
        <div>
            <div className={styles.title_div}>
                <h2 className={styles.title}>Welcome to Admin panel of {instituteName} </h2>  
            </div>
            <div className={styles.main_container}>
                <div className={styles.prof_data}>
                    <div className={styles.prof_title}>
                        <h2>Professor Data</h2>
                        <h5>Add professor's E-mail ID</h5>
                    </div>
                    <div className={styles.textfield}>
                        <textarea className={styles.textarea} rows="2" cols="25" placeholder="For multiple data add comma-separated values" onChange={(e) => setformProfessors(e.target.value)}></textarea><br/>
                        <div className={styles.btn_section}>
                        <button className={styles.button1} onClick={addProfessors}> Add </button>
                        <button className={styles.button2} onClick={removeProfessors}> Remove</button>
                        </div>
                    </div>
                        <div className={styles.content}>
                            <p style={{"text-align":"center","text-decoration":"underline"}}>List of Professors</p>
                            {professors && professors.map((professor)=> 
                                    <p className={styles.professor}>{professor}</p>
                            )}
                        </div>
                </div>
               
                
                
                <div className={styles.stu_data}>
                    <div className={styles.stu_title}>
                        <h2>Student Data</h2>
                        <h5>Add Student's E-mail ID</h5>
                    </div>
                    <div className={styles.stu_textfield}>
                        <textarea className={styles.stu_textarea} rows="5" cols="25" placeholder="For multiple data add comma-separated values" onChange={(e) => setformStudents(e.target.value)}></textarea><br/>
                        <div className={styles.stu_btn}>
                            <button className={styles.button1} onClick={addStudents}> Add  </button>
                            <button className={styles.button2} onClick={removeStudents}> Remove </button>
                        </div>
                    </div>
                    <div className={styles.stu_content}>
                    <p style={{"text-align":"center","text-decoration":"underline"}}>List of Students</p>
                        {students && students.map((student)=> 
                                <p className={styles.student}>{student}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}