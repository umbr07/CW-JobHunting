import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ViewVacancy({ show, onHide, vacancy }) {
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
        <Button variant="primary" onClick={onHide}>
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewVacancy;
