import axios from 'axios'
import { useState, useEffect } from 'react'
import sacStyle from './StudentAssignmentComponent.module.css'

export default function StudentAssignmentComponent(props) {
    const [assignmentStatus, setassignmentStatus] = useState(0)
    const [assignmentUpload, setassignmentUpload] = useState(0)
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/student-assignment-status/'+sessionStorage.getItem("Id"),{
            params:{
                "assignmentId" : props.Id
            }
        })
        .then(function (response) {
            if(response.data == "No assignment"){
                setassignmentStatus(0)
            }
            else{
                setassignmentStatus(response.data)
            }
        })
        .catch(function (error) {
          console.log(error);
        });
        
    }, [assignmentUpload])

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

    function submitAssignment(){
        var assignmentDescription = document.getElementById("AssignmentDescription").value;
        var formData = new FormData();
        var file = document.getElementById("submitAssignmentFile");
        formData.append("file", file.files[0]);
        formData.append("assignmentDescription", assignmentDescription)
        formData.append("courseId", sessionStorage.getItem("courseId"))
        formData.append("assignmentId", props.Id)

        axios.post('http://127.0.0.1:5000/student-assignment/'+sessionStorage.getItem("Id"), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
        }})
        .then(function (response) {
            // setassignmentData(response.data)
            console.log(response.data)
            setassignmentUpload(assignmentUpload + 1)
            let assignmentModal = document.getElementById(props.Id+"-myModal")
            assignmentModal.style.display = "none"
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    return (
        <div>
            <p style={{textAlign: "left", marginLeft: "10%"}} onClick={() => openAssignmentModal(props.Id)}>{props.title}</p>

            <div id={props.Id+"-myModal"} className={sacStyle.modal}>
                <div className={sacStyle.modalContent}>
                    <span className={sacStyle.close} onClick={() => closeAssignmentModal(props.Id)}>&times;</span>
                    <h2>{props.title}</h2>
                    <p>{props.description}</p>
                    <a href={props.url}>{props.fileName}</a>
                    <hr></hr>
                    {assignmentStatus ? 
                        <div>
                        <h3>Assignment Submitted</h3>
                        {assignmentStatus.url}
                        </div>
                    :
                        <div>
                        <h3>Submit Assignment</h3>
                        <p style={{display:"inline-block", marginRight:"5px"}}>Assignment Description : </p>
                        <input type="text" name='AssignmentDescription' id='AssignmentDescription'></input><br></br>
                        <p style={{display:"inline-block", marginRight:"5px"}}>Assignment File : </p>
                        <input type="file" id="submitAssignmentFile"></input><br></br>
                        <button onClick={submitAssignment}>Add Assignment</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
