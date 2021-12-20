import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./modalpopup.module.css"

function Modal({show, onClose, children, title}) {
    const [isBrowser, setIsBrowser] = useState(false);
  
    useEffect(() => {
      setIsBrowser(true);
    }, []);

	const handleClose = (e) => {
		e.preventDefault();
		onClose();
	}

    const modalContent = show ? (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<div className={styles.header}>
					<p>{title}</p>
					<a href="#" onClick={handleClose}>
						<button className={styles.btn}>
							X
						</button>	
					</a>
				</div>
				<div className={styles.body}>
					{children}
				</div>
			</div>
		</div>
	): null;

	if(isBrowser){
		return ReactDOM.createPortal(
			modalContent,
			document.getElementById("modal-root")
		)
	}else{
		return null;
	}
  
}

export default Modal;