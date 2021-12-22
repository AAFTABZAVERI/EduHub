import axios from "axios"
import Router from "next/router"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import styles from '../../styles/instituteSignUp.module.css';

export default function signup() {

    const [beforeSubmit, setbeforeSubmit] = useState(1)

    const name = useRef(null)
    const description = useRef(null)
    const email = useRef(null)

    const instituteSignup = () => {
        const currentname = name.current.value
        const currentdesc = description.current.value
        const currentemail = email.current.value

        axios.post('http://127.0.0.1:5000/add-institute', {
            "name": currentname,
            "description": currentdesc,
            "email": currentemail
        })
            .then(function (response) {
                console.log(response);
                setbeforeSubmit(0)
                // Router.push('/dashboard')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const loginRedirect = () => {
        // Router.push('/login')
    }

        
    return (
        <div>
            {beforeSubmit ?
                <div className={styles.container}>
                    <form>
                        <h1 style={{"padding-bottom":"10%","padding-top":"4%"}}> Sign Up </h1>
                        <label className={styles.lbl}>Institute Name</label>
                        <input ref={name} type="text" id="name" name="name" className={styles.txtbox} /> <br /><br />
                        <label className={styles.lbl}>Description </label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input ref={description} type="text" id="description" name="description" className={styles.txtbox} /> <br /><br />
                        <label className={styles.lbl}>Email Address</label> &nbsp;
                        <input ref={email} type="text" id="email" name="email" className={styles.txtbox} /> <br /><br />
                    </form> <br />
                    
                        <button onClick={instituteSignup} className={styles.btn}> Submit </button> <br /><br />
                    
                </div>
                :
                <div className={styles.text}>
                <div className={styles.heading_div}><label className={styles.heading}>Your form is submitted</label></div>
                <div className={styles.heading_div2}><label className={styles.heading2}>You will be Redirected to Login Page in </label></div>
                <div className={styles.heading_div3} ><label id="timer" className={styles.heading3}> </label></div>
                </div>
            }
        </div>
    )
}