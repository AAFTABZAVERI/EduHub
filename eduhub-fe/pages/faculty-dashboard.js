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

  let propdata = {
    "name" : "Enterprice Computing",
    "faculty":"pm jatt", 
    "Id":"23r534hhv2345hv25",
    "description" : "This is the sample description"
  }
  return (
    <div className={style.container}>
      <NavBar />
      <div className={styles.gridContainer}>
        <FacultyDashboardComponent name={propdata.name} faculty={propdata.faculty} id={propdata.Id} description={propdata.description}/>
      </div>
      <div>
        <button className={styles.addButtonCss} onClick={addButton} >+</button>
      </div>
      <div>
        <div id="myModal" className= {styles.modal}>
          <div className={styles.modalContent}>
          <span className={styles.close} onClick={addButtonClose}>&times;</span>
            <div>
              <p style={{display:"inline-block", marginRight:"5px"}}>Course Name : </p>
              <input type="text" name='Course Name'></input><br></br>
              <p style={{display:"inline-block", marginRight:"5px"}}>Course Description : </p>
              <input type="text" name='Course Description'></input><br></br>
              <button className={styles.addCourseButtonCss}>Add Course</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

