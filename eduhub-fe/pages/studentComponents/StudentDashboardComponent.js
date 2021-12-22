import style from '../../styles/Home.module.css';
import styles from '../../styles/dashboard.module.css';
import sdcStyle from './StudentDashboardComponent.module.css'
import Router from 'next/router'
import axios from 'axios';

function StudentDashboardComponent(props) {
    function threeDots(Id){
      let modal = document.getElementById(Id+'-model')
      modal.style.display = "block"
  }

  function closethreeDots(Id){
      let modal = document.getElementById(Id+'-model')
      modal.style.display = "none"
  }

  function deleteCourse(Id){
    axios.delete('http://127.0.0.1:5000/student-class/'+sessionStorage.getItem("Id"),{
      data:{
        "courseId":Id
      }
    })
    .then(function (response) {
      Router.reload(window.location.pathname)
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }

  function openCourse(courseId){
    console.log(courseId)
    sessionStorage.setItem("courseId", courseId)
    Router.push('/course')
  }

    return (
      <div className={styles.gridItem}>
          <div className={styles.class}>
            <img className={styles.subjectImg} src="/subject1.jpg" />
            <div className={styles.other} onClick={() => openCourse(props.Id)}>
              <p className={styles.title}> {props.name} </p>
              <p className={styles.prof}> {props.faculty} </p>
              <div className={styles.desc}>
                <p className={styles.desc}> {props.description}  </p>
              </div>
            </div>
            <div>
              <img className={styles.dots} src="/three-dots.png" onClick={()=> threeDots(props.Id)}/>
              <div id={props.Id+'-model'} className={sdcStyle.modal}>
                <div className={sdcStyle.modalContent}>
                  <span className={sdcStyle.close} onClick={() => closethreeDots(props.Id)}>&times;</span>
                  <p>{props.name} {` Id : `+ props.Id}</p>
                  <button onClick={() => deleteCourse(props.Id)}> Delete course </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
  
  export default StudentDashboardComponent