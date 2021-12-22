import { useState, useEffect } from 'react';
import style from '../styles/Home.module.css';
import styles from '../styles/dashboard.module.css';
import NavBar from '../components/navbar';
import StudentDashboardComponent from './studentComponents/StudentDashboardComponent';
import axios from 'axios';
// import Popup from '../components/modalpopup';


export default function Dashboard() {
  const [studnetCourse, setstudnetCourse] = useState(0)
  // console.log(sessionStorage.getItem("Id"))
  useEffect(() => {
    console.log(sessionStorage.getItem("Id"))
    axios.get('http://127.0.0.1:5000/student-class/'+sessionStorage.getItem("Id"))
        .then(function (response) {
          setstudnetCourse(response.data)
          console.log(studnetCourse)
        })
        .catch(function (error) {
          console.log(error);
        });
        console.log(studnetCourse)
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
    var courseCode = document.getElementById("CourseCode").value;
    // var courseDescription = document.getElementById("CourseDescription").value;

    axios.post('http://127.0.0.1:5000/student-class/'+sessionStorage.getItem("Id"), {
          "instituteId" : sessionStorage.getItem("instituteId"),
          // "facultyName": sessionStorage.getItem("name"),
          "email":sessionStorage.getItem("email"),
          // "courseName" : courseName,
          // "courseDesc" : courseDescription,
          "courseCode":courseCode
        })
        .then(function (response) {
          console.log(response.data)
          var modal = document.getElementById("myModal");
          modal.style.display = "none";
          setstudnetCourse(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });

  }

  

  return (
    <div className={style.container}>
      <NavBar />
      <div className={styles.gridContainer}>
        {studnetCourse ? studnetCourse.map((course) => 
        <StudentDashboardComponent name={course.name} faculty={course.faculty} id={course.Id} description={course.description}/> ) 
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
              <p style={{display:"inline-block", marginRight:"5px"}}>Course Code : </p>
              <input type="text" name='CoursCode' id='CourseCode'></input><br></br>
              {/* <p style={{display:"inline-block", marginRight:"5px"}}>Course Description : </p> */}
              {/* <input type="text" name='CourseDescription' id='CourseDescription'></input><br></br> */}
              <button onClick={addCourse}>Add Course</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

