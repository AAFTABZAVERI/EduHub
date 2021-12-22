import { useState, useEffect } from 'react';
import style from '../styles/Home.module.css';
import styles from '../styles/dashboard.module.css';
import NavBar from '../components/navbar';
import FacultyDashboardComponent from './facultyComponents/FacultyDashboardComponent';
import axios from 'axios';
// import Popup from '../components/modalpopup';


export default function Dashboard() {
  const [professorCourse, setprofessorCourse] = useState(0)
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/faculty-classroom/'+sessionStorage.getItem("Id"))
        .then(function (response) {
          setprofessorCourse(response.data)
          console.log(professorCourse)
        })
        .catch(function (error) {
          console.log(error);
        });
  }, [])

  function addButton(){
    console.log("working")
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }

  function addButtonClose(){
    console.log("working")
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  function addCourse(){
    var courseName = document.getElementById("CourseName").value;
    var courseDescription = document.getElementById("CourseDescription").value;

    axios.post('http://127.0.0.1:5000/faculty-classroom/'+sessionStorage.getItem("Id"), {
          "instituteId" : sessionStorage.getItem("instituteId"),
          "facultyName": sessionStorage.getItem("name"),
          "courseName" : courseName,
          "courseDesc" : courseDescription
        })
        .then(function (response) {
          console.log(response.data)
          setprofessorCourse(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });

  }

  return (
    <div className={style.container}>
      <NavBar />
      <div className={styles.gridContainer}>
        {professorCourse ? professorCourse.map((course) => 
        <FacultyDashboardComponent name={course.name} faculty={course.faculty} Id={course.courseId} description={course.description}/> ) 
        : 
        <div> No course Available </div>}
      </div>
      <div>
        <button onClick={addButton} >+</button>
      </div>
      <div>
        <div id="myModal" className= {styles.modal}>
          <div className={styles.modalContent}>
          <span className={styles.close} onClick={addButtonClose}>&times;</span>
            <div>
              <p style={{display:"inline-block", marginRight:"5px"}}>Course Name : </p>
              <input type="text" name='CourseName' id='CourseName'></input><br></br>
              <p style={{display:"inline-block", marginRight:"5px"}}>Course Description : </p>
              <input type="text" name='CourseDescription' id='CourseDescription'></input><br></br>
              <button onClick={addCourse}>Add Course</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

