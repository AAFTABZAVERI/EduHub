import axios from 'axios'
import facStyle from './FacultyAssignmentComponent.module.css'


export default function FacultyAssignmentComponent(props) {

    function openAssignmentModal(){
        let modal = document.getElementById(props.Id+"-myModal")
        modal.style.display = "block"
    }

    function closeAssignmentModal(){
        let modal = document.getElementById(props.Id+"-myModal")
        modal.style.display = "none"
    }

    function deleteAssignment(Id){
        axios.delete('http://127.0.0.1:5000/faculty-assignment/'+sessionStorage.getItem("instituteId"),{
            data: {
                "assignmentId":Id,
                "courseId": sessionStorage.getItem("courseId")
            }
        }
        )
        .then(function (response) {
            let modal = document.getElementById(props.Id+"-myModal")
            modal.style.display = "none"
            Router.reload(window.location.pathname)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div>
            <p style={{textAlign: "left", marginLeft: "10%"}} onClick={() => openAssignmentModal(props.Id)}>{props.title}</p>

            <div id={props.Id+"-myModal"} className={facStyle.modal}>
                <div className={facStyle.modalContent}>
                    <span className={facStyle.close} onClick={() => closeAssignmentModal(props.Id)}>&times;</span>
                    <h3>{props.title}</h3>
                    <p>{props.description}</p>
                    <a href={props.url}>{props.fileName}</a>
                    <hr></hr>
                    <button onClick={() => deleteAssignment(props.Id)} style={{float:"right"}}>Delete assignment</button>
                </div>
            </div>
        </div>
    )
}
