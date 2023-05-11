import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import jwt_decode from "jwt-decode";
import axios from "axios";

function ViewVacancy({ show, onHide, vacancy }) {
  const applyVacancy = async () => {
    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    const id_user = decodedToken.id;
    console.log(id_user);
    const id_vacancy = vacancy.Id;

    const res = await axios.post("http://localhost:5000/api/vacancyapply", {
      id_user,
      id_vacancy,
    });
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
          {vacancy.Job_title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Description: {vacancy.Description}</p>
        <p>Per month: {vacancy.Salary}</p>
        <p>Location: {vacancy.Location}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={applyVacancy}>
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewVacancy;
