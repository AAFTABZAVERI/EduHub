import GoogleLogin from 'react-google-login';
import Router from 'next/router'
import axios from "axios";
import styles from '../../styles/login.module.css';


export default function login(){

    const onSuccess = (response) => {
        console.log(response)
        sessionStorage.setItem("email", response.profileObj.email);
        sessionStorage.setItem("name", response.profileObj.name);
        sessionStorage.setItem("imageurl", response.profileObj.imageUrl);
        sessionStorage.setItem("googleId", response.googleId);
        sessionStorage.setItem("tokenID", response.tokenId);
        sessionStorage.setItem("accessToken", response.accessToken);
        axios.get('http://127.0.0.1:5000/institute-login', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("tokenID")}`
            }
        })
        .then(function (response) {
            console.log(response);
            sessionStorage.setItem("instituteId", response.data["Id"])
            sessionStorage.setItem("instituteName", response.data["instituteName"])
            sessionStorage.setItem("instituteDescription", response.data["instituteDescription"])
            Router.push('admin')
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const onFail = (response) => {
        console.log(response)
    }

    return(
            <div>
                <div className={styles.container}>
                    <form>
                        <h1 style={{"padding-bottom":"2%"}}> Login  To Institute </h1>
                       
                        <label className={styles.lbl}>E-mail Address </label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input  type="text" id="email" name="email" className={styles.txtbox} /> <br /><br />
                        <label className={styles.lbl}>Password</label> &nbsp;
                        <input  type="password" id="password" name="password" className={styles.txtbox} /> <br /><br />
                    </form> <br />
                        <button className={styles.btn}> Login</button> <br /><br />
                            <hr className={styles.horizontal}></hr>
                        <GoogleLogin
                            clientId="1029920867014-8l02s0sh2ossi9sa06u83e09o26elkpf.apps.googleusercontent.com"
                            buttonText="Login to institite"
                            onSuccess={onSuccess}
                            onFailure={onFail}
                            cookiePolicy={'single_host_origin'}
                            className={styles.google_btn}
                        />
                </div>
        </div>
    )
}