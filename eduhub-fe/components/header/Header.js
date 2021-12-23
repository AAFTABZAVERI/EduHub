import React from 'react'
import styles from "./header.module.css"
import axios from "axios"
import GoogleLogin from 'react-google-login';




export default function Header() {
  const responseGoogle = (response) => {
    console.log(response);
    sessionStorage.setItem("email", response.profileObj.email);
    sessionStorage.setItem("name", response.profileObj.name);
    sessionStorage.setItem("imageurl", response.profileObj.imageUrl);
    sessionStorage.setItem("googleId", response.googleId);
    sessionStorage.setItem("tokenID", response.tokenId);
    sessionStorage.setItem("accessToken", response.accessToken);

    // axios.post('http://127.0.0.1:5000/tokenApi', {
    //   tokenId: response.tokenId,
    // },)
    // .then(function (response) {
    //   console.log(response);
    //   Router.push('/dashboard')
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });

    axios.get('http://127.0.0.1:5000/tokenApi', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tokenID")}`
      }
    })
    .then(function (response) {
      sessionStorage.setItem("Id", response.data[0].Id)
      sessionStorage.setItem("instituteId", response.data[0].instituteId)
      sessionStorage.setItem("user", response.data[0].user)
      if(response.data[0].user == "faculty"){
        Router.push('/faculty-dashboard')
      }
      else if (response.data[0].user == "student") {
        Router.push('/dashboard')
      } else {
        alert("No user found in any institute with provided email")
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  return (
    <div>
      <div className={styles.flexcontainerheader}>
        <span>
          <header className={styles.headerouter}>
            <div className={`${styles.headerinner} ${styles.responsivewrapper}`}>

              <div className={styles.thicker}>EduHub</div>

              <nav className={styles.headernavigation}>
                <a href="#home">Home</a>
                <a href="#aboutus">About</a>
                <a href="#feature">Feature</a>
                <a href="#contactus">Contact Us</a>
                <GoogleLogin
                  clientId="1029920867014-8l02s0sh2ossi9sa06u83e09o26elkpf.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
              </nav>
            </div>
          </header>
        </span>
      </div>

      {/*---slider----*/}
      <div id ="home">

        <img src="./Pic1.svg" className={styles.pic1} />
      </div>






      {/*---slider----*/}
      <div id ="aboutus">
      <div className={styles.container}>
        <div className={styles.featuretitle}>
          <p className={styles.aboutus}>About Us</p>
        </div>
        <img src="./pic2.svg" className={styles.aboutimg} />
        <div class={styles.blogslider}>
          <h2>Save time and simplify everyday tasks</h2>
          <p className={styles.bullet}>
            <ul class={styles.ula}>
              <li>Switch from class to assignment to student in just a few clicks</li>
              <li>Track student progress in assignment and export scores to your school’s student information system (SIS)</li>
              <li>Facluty and student connect with each other in essay way</li>
              <li>Faculty can management class of student in easy way </li>
              <li>Student can view  study material, assignments, and quizzes across multiple classes</li>
            </ul>

          </p>

        </div>
      </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <p className={styles.bullet}><center><i><b>”</b>Of all the technology solutions I have used within <br /> education, EduHub has had the most <br />dramatic impact on teaching and learning from<br /> the very moment I used it in my schools.<b>”</b></i></center></p>


     
    
     {/*---Feature----*/}
      <div id = "feature">
      <div className={styles.featuretitle}>
          About Feature
        </div>
        <div className={styles.container1}>
          <div className={styles.card}>
             <div className={styles.cardimage}><img src="./feature1.svg" className={styles.featureimg} /></div>
             <center><h2 className={styles.cardh2}>Easy to use
</h2></center> 
             <p className={styles.cardp}>Anyone in your school community can get up and running with Classroom in minutes.

</p>
         </div>
         <div className={styles.card}>
             <div className={styles.cardimage}><img src="./feature2.svg" className={styles.featureimg} /></div>
             <center><h2 className={styles.cardh2}>Built for collaboration</h2></center>
             <p className={styles.cardp}>Work simultaneously in the same document with the whole class or connect face-to-face with Google Meet.</p>
         </div>
         <div className={styles.card}>
             <div className={styles.cardimage}><img src="./feature3.svg" className={styles.featureimg} /></div>
             <center><h2 className={styles.cardh2}>Access from anywhere</h2></center>
             <p className={styles.cardp}>Empower teaching and learning from anywhere, on any device, and give your class more flexibility.</p>
         </div>
         <div className={styles.card}>
             <div className={styles.cardimage}> <img src="./feature4.svg" className={styles.featureimg1} /></div>
             <center><h2 className={styles.cardh2}>All-in-one place</h2></center>
             <p className={styles.cardp}>Bring all your learning tools together and manage multiple classes in one central destination.</p>
         </div>
       
         
          
        </div>
        
        
        
             <img src="./EduHub.png" className={styles.eduhub} />
           
         

      </div>




      <div id="contactus">
        <div className={styles.foot}>
          <footer class={styles.footer}>
            <div class={styles.waves}>
              <div class={styles.wave} id="wave1"></div>
              <div class={styles.wave} id="wave2"></div>
              <div class={styles.wave} id="wave3"></div>
              <div class={styles.wave} id="wave4"></div>
            </div>
            <ul class={styles.socialicon}>
              <li class={styles.socialiconitem}><a class={styles.socialiconlink} href="https://www.facebook.com/">
               <img src="./face.png" className={styles.imgf}></img>
              </a></li>
              <li class={styles.socialiconitem}><a class={styles.socialiconlink} href="https://www.instagram.com/">
              <img src="./inst.png" className={styles.imgf}></img>
              </a></li>
              <li class={styles.socialiconitem}><a class={styles.socialiconlink} href="https://www.linkedin.com/">
              <img src="./link.png" className={styles.imgf}></img>
              </a></li>
              <li class={styles.socialiconitem}><a class={styles.socialiconlink} href="https://twitter.com/">
              <img src="./twi.png" className={styles.imgf}></img>
              </a></li>
            </ul>
            <ul class={styles.menu}>
              <li class={styles.menuitem}><a class={styles.menulink} href="#home">Home</a></li>
              <li class={styles.menuitem}><a class={styles.menulink} href="#aboutus">About</a></li>
              <li class={styles.menuitem}><a class={styles.menulink} href="#feature">Feature</a></li>
              
              <li class={styles.menuitem}><a class={styles.menulink} href="#contactus">Contact</a></li>

            </ul>
            <p>&copy;2021 Group 10 | All Rights Reserved</p>
          </footer>
        </div>



      </div>



    </div>
  )
}
