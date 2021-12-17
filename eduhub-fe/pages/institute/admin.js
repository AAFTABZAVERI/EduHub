
import axios from "axios";
import { useEffect, useRef, useState } from "react"

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
            <div>
                <h2>Welcome to Admin pannel of {instituteName} </h2>  
            </div>
            <div>
                <h4>Professor Data</h4>
                <div>
                    {professors && professors.map((professor)=> 
                        <div>
                            {professor}
                        </div>
                    )}
                </div>
                <textarea rows="2" cols="25" placeholder="For multiple data add comma-separated values" onChange={(e) => setformProfessors(e.target.value)}></textarea><br/>
                <button onClick={addProfessors}> Add Professor/s </button>
                <button onClick={removeProfessors}> Remove Professor/s</button>
            </div>

            <div>
                <h4>Student Data</h4>
                <div>
                    {students && students.map((student)=> 
                        <div>
                            {student}
                        </div>
                    )}
                </div>
                <textarea rows="5" cols="25" placeholder="For multiple data add comma-separated values" onChange={(e) => setformStudents(e.target.value)}></textarea><br/>
                <button onClick={addStudents}> Add student/s </button>
                <button onClick={removeStudents}> Remove student/s</button>
            </div>
        </div>
    )
}