import styles from '../../styles/course.module.css';
import mcStyle from './MaterialComponent.module.css'
import axios from 'axios';
import { Router } from 'next/router';

function MaterialComponent(props) {

    function openMaterialModal(){
        let modal = document.getElementById(props.Id+"-myModal")
        modal.style.display = "block"
    }

    function closeMaterialModal(){
        let modal = document.getElementById(props.Id+"-myModal")
        modal.style.display = "none"
    }

    function deleteMaterial(Id){
        axios.delete('http://127.0.0.1:5000/faculty-material/'+sessionStorage.getItem("instituteId"),{
            data: {
                "materialId":Id
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
            <p className={styles.p} onClick={() => openMaterialModal(props.Id)}> {props.title}</p>

            <div id={props.Id+"-myModal"} class={mcStyle.modal}>
                <div class={mcStyle.modalContent}>
                    <span class={mcStyle.close} onClick={() => closeMaterialModal(props.Id)}>&times;</span>
                    <h3>{props.title}</h3>
                    <p>{props.description}</p>
                    <hr></hr>
                    <a href={props.url}>{props.fileName}</a>
                    <button onClick={() => deleteMaterial(props.Id)} style={{float:"right"}}>Delete material</button>
                </div>
            </div>
        </div>
    )
}

export default MaterialComponent