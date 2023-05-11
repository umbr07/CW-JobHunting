import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { EditUser } from "../../http/userAPI";

function EditeProfile({ show, onHide, Info }) {
  const [Fname, setFname] = useState(Info.FirstName);
  const [Lname, setLname] = useState(Info.LastName);
  const [Phone, setPhone] = useState(Info.Phone);

  const EditInfoUser = async () => {
    try {
      const response = await EditUser(Fname, Lname, Phone);
      console.log(response);
    } catch (e) {
      alert(e.response);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edite profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>
            First Name<span> *</span>
          </Form.Label>
          <Form.Control
            placeholder={"Enter the first name"}
            value={Fname}
            onChange={(e) => setFname(e.target.value)}
          ></Form.Control>
          <Form.Label className="mt-2">
            Last Name<span> *</span>
          </Form.Label>
          <Form.Control
            placeholder={"Enter the last name"}
            value={Lname}
            onChange={(e) => setLname(e.target.value)}
          ></Form.Control>
          <Form.Label className="mt-2">
            Phone Number<span> *</span>
          </Form.Label>
          <Form.Control
            placeholder={"Enter the phone number"}
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={EditInfoUser}>
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditeProfile;
