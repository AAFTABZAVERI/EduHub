import style from '../../styles/Home.module.css';
import styles from '../../styles/dashboard.module.css';
import fdcStyle from './FacultyDashboardComponent.module.css'
import Router from 'next/router'
import axios from 'axios';


function FacultyDashboardComponent(props) {

  function threeDots(Id){
      let modal = document.getElementById(Id+'-model')
      modal.style.display = "block"
  }

  function closethreeDots(Id){
      let modal = document.getElementById(Id+'-model')
      modal.style.display = "none"
  }

  function deleteCourse(Id){
    axios.delete('http://127.0.0.1:5000/faculty-classroom/'+sessionStorage.getItem("Id"),{
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
    // Router.reload(window.location.pathname)
  }

    return (
      <div className={styles.gridItem}>
          <div className={styles.class}>
            <img className={styles.subjectImg} src="/subject1.jpg" />
            <div className={styles.other}>
              <p className={styles.title}> {props.name} </p>
              <p className={styles.prof}> {props.faculty} </p>
              <div className={styles.desc}>
                <p className={styles.desc}> {props.description}  </p>
              </div>
            </div>
            <div>
              <img className={styles.dots} src="/three-dots.png" onClick={() => threeDots(props.Id)}/>
              <div id={props.Id+'-model'} className={fdcStyle.modal}>
                <div className={fdcStyle.modalContent}>
                  <span className={fdcStyle.close} onClick={() => closethreeDots(props.Id)}>&times;</span>
                  <p>{props.name} {props.Id}</p>
                  <button onClick={() => deleteCourse(props.Id)}> Delete course </button>
                </div>
              </div>
            </div>
          </div>
          
      </div>
    )
  }
  
  export default FacultyDashboardComponent