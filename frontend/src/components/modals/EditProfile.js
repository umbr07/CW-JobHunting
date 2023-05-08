import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function EditeProfile({ show, onHide, decodedToken }) {
  const [CompanyId, setCompany] = useState(decodedToken.fname);
  const [Title, setTitle] = useState(decodedToken.lname);
  const [Salary, setPosition] = useState(decodedToken.phone);

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
            placeholder={"Enter the company name"}
            value={CompanyId}
            onChange={(e) => setCompany(e.target.value)}
          ></Form.Control>
          <Form.Label className="mt-2">
            Last Name<span> *</span>
          </Form.Label>
          <Form.Control
            placeholder={"Enter the job title"}
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
          <Form.Label className="mt-2">
            Phone Number<span> *</span>
          </Form.Label>
          <Form.Control
            placeholder={"Enter the salary for this position"}
            value={Salary}
            onChange={(e) => setPosition(e.target.value)}
          ></Form.Control>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success">Edit</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditeProfile;
