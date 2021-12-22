import style from '../../styles/Home.module.css';
import styles from '../../styles/dashboard.module.css';

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
            </div>
          </div>
        </div>
    )
  }
  
  export default StudentDashboardComponent