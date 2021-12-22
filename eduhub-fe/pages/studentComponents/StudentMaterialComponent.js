import styles from '../../styles/course.module.css';
import smcStyle from './StudentMaterialComponent.module.css'
import axios from 'axios';
import Router  from 'next/router';

function MaterialComponent(props) {

    function openMaterialModal(){
        let modal = document.getElementById(props.Id+"-myModal")
        modal.style.display = "block"
    }

    function closeMaterialModal(){
        let modal = document.getElementById(props.Id+"-myModal")
        modal.style.display = "none"
    }

    return (
        <div>
            <p className={styles.p} onClick={() => openMaterialModal(props.Id)}> {props.title}</p>

            <div id={props.Id+"-myModal"} class={smcStyle.modal}>
                <div class={smcStyle.modalContent}>
                    <span class={smcStyle.close} onClick={() => closeMaterialModal(props.Id)}>&times;</span>
                    <h3>{props.title}</h3>
                    <p>{props.description}</p>
                    <hr></hr>
                    <a href={props.url}>{props.fileName}</a>
                </div>
            </div>
        </div>
    )
}

export default MaterialComponent