import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class Modalpopup extends React.Component {
	constructor() {
		super();
		this.state = {
			show: false,
		};
	}

	handleModal() {
		this.setState((pState) => ({ show: !pState.show }));
	}
 
	render() {
		const { show } = this.state;
		return (
			<div>
				{/* <h1>Bootstrap model in react</h1> */}
				<Button
					onClick={() => {
						this.handleModal();
					}}
				>
					Open Modal
				</Button>
				<Modal
					onHide={() => {
						this.handleModal();
					}}
					show={show}
					size="md"
					aria-labelledby="contained-modal-title-vcenter"
					centered
				>
					<Modal.Header closeButton>You need to login first</Modal.Header>
					<Modal.Body>Click here to login</Modal.Body>
					<Modal.Footer>
						<Button
							onClick={() => {
								this.handleModal();
							}}
						>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}
