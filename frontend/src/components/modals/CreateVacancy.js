import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { AddVacancy } from "../../http/userAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateVacancy({ show, onHide }) {
  const [CompanyId, setCompany] = useState("");
  const [Title, setTitle] = useState("");
  const [Desc, setDescription] = useState("");
  const [Salary, setPosition] = useState("");
  const [Location, setLocation] = useState("");

  const [companyIdError, setCompanyIdError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [salaryError, setSalaryError] = useState(false);
  const [locationError, setLocationError] = useState(false);

  const successNotify = (s) => {
    toast.success(s, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const errorNotify = (e) => {
    toast.error(e, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const addVacancy = async () => {
    if (!CompanyId) {
      setCompanyIdError(true);
    } else {
      setCompanyIdError(false);
    }
    if (!Title) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
    if (!Desc) {
      setDescError(true);
    } else {
      setDescError(false);
    }
    if (!Salary) {
      setSalaryError(true);
    } else {
      setSalaryError(false);
    }
    if (!Location) {
      setLocationError(true);
    } else {
      setLocationError(false);
    }
    if (CompanyId && Title && Desc && Salary && Location) {
      try {
        const response = await AddVacancy(
          CompanyId,
          Title,
          Desc,
          Salary,
          Location
        );
        console.log(response);
        let success = "The vacancy was successfully added";
        successNotify(success);
      } catch (e) {
        let error = "Fill in all the fields correctly";
        errorNotify(error);
      }
    } else {
      let error = "Fill in all the fields correctly";
      errorNotify(error);
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
            className={companyIdError ? "is-invalid" : ""}
          ></Form.Control>
          <Form.Label>
            Job title<span> *</span>
          </Form.Label>
          <Form.Control
            placeholder={"Enter the job title"}
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            className={titleError ? "is-invalid" : ""}
          ></Form.Control>
          <Form.Label>
            Description<span> *</span>
          </Form.Label>
          <Form.Control
            placeholder={"Enter a job description"}
            value={Desc}
            onChange={(e) => setDescription(e.target.value)}
            className={descError ? "is-invalid" : ""}
          ></Form.Control>
          <Form.Label>
            Salary for this position<span> *</span>
          </Form.Label>
          <Form.Control
            placeholder={"Enter the salary for this position"}
            value={Salary}
            onChange={(e) => setPosition(e.target.value)}
            className={salaryError ? "is-invalid" : ""}
          ></Form.Control>
          <Form.Label>
            City in which you will have to work<span> *</span>
          </Form.Label>
          <Form.Control
            placeholder={"Enter the city in which you will have to work"}
            value={Location}
            onChange={(e) => setLocation(e.target.value)}
            className={locationError ? "is-invalid" : ""}
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
      <ToastContainer />
    </Modal>
  );
}

export default CreateVacancy;
