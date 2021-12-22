import style from '../../styles/Home.module.css';
import styles from '../../styles/dashboard.module.css';
import sdcStyle from './StudentDashboardComponent.module.css'
import Router from 'next/router'


function StudentDashboardComponent(props) {
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
              <img className={styles.dots} src="/three-dots.png" />
              <div id={props.Id+'-model'} className={sdcStyle.modal}>
                <div className={sdcStyle.modalContent}>
                  <span className={sdcStyle.close} onClick={() => closethreeDots(props.Id)}>&times;</span>
                  <p>{props.name}</p>
                  <button onClick={() => deleteCourse(props.Id)}> Delete course </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
  
  export default StudentDashboardComponent