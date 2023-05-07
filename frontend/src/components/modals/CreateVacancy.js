import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { AddVacancy } from "../../http/userAPI";

function CreateVacancy({ show, onHide }) {
  const [CompanyId, setCompany] = useState(" ");
  const [Title, setTitle] = useState(" ");
  const [Desc, setDescription] = useState(" ");
  const [Salary, setPosition] = useState(" ");
  const [Location, setLocation] = useState(" ");

  const addVacancy = async () => {
    try {
      const response = await AddVacancy(
        CompanyId,
        Title,
        Desc,
        Salary,
        Location
      );
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
          Create vacancy
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>
            Company ID<span> *</span>
          </Form.Label>
          <Form.Control
            placeholder={"Enter the company name"}
            value={CompanyId}
            onChange={(e) => setCompany(e.target.value)}
          ></Form.Control>
          <Form.Label className="mt-2">
            Job title<span> *</span>
          </Form.Label>
          <Form.Control
            placeholder={"Enter the job title"}
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
          <Form.Label className="mt-2">
            Description<span> *</span>
          </Form.Label>
          <Form.Control
            placeholder={"Enter a job description"}
            value={Desc}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
          <Form.Label className="mt-2">
            Salary for this position<span> *</span>
          </Form.Label>
          <Form.Control
            placeholder={"Enter the salary for this position"}
            value={Salary}
            onChange={(e) => setPosition(e.target.value)}
          ></Form.Control>
          <Form.Label className="mt-2">
            City in which you will have to work<span> *</span>
          </Form.Label>
          <Form.Control
            placeholder={"Enter the city in which you will have to work"}
            value={Location}
            onChange={(e) => setLocation(e.target.value)}
          ></Form.Control>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={addVacancy}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateVacancy;
