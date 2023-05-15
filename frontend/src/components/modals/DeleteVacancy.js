import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import VacancyInfo from "../VacancyInfo";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { DeletVacancy } from "../../http/userAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DeleteVacancy({ show, onHide }) {
  const [Info, setInfo] = useState([]);
  const [vacancyIdDelete, setVacancyIdDelete] = useState("");

  const [companyIdError, setCompanyIdError] = useState(false);

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

  const loadVacancyInfo = async () => {
    const res = await axios.get("http://localhost:5000/api/vacancy");
    setInfo(res.data);
  };

  useEffect(() => {
    loadVacancyInfo();
  }, []);

  const deletVacancy = async () => {
    if (!vacancyIdDelete) {
      setCompanyIdError(true);
    } else {
      setCompanyIdError(false);
    }
    if (vacancyIdDelete) {
      try {
        const response = await DeletVacancy(vacancyIdDelete);
        console.log(response);
        loadVacancyInfo();
        let success = "The vacancy was successfully deleted";
        successNotify(success);
      } catch (e) {
        let error = "Fill in the field correctly";
        errorNotify(error);
      }
    } else {
      let errors = "Fill in all the fields correctly";
      errorNotify(errors);
    }
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={onHide}
        fullscreen={true}
        dialogClassName={"modal-fullscreen"}
      >
        <Modal.Header closeButton>
          <Modal.Title>Vacancy panel</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex">
          <div style={{ height: "200px", width: "400px" }}>
            <Form>
              <Form.Label>
                Enter the vacancy ID<span> *</span>
              </Form.Label>
              <Form.Control
                style={{ width: "280px" }}
                placeholder={"Enter the user ID"}
                value={vacancyIdDelete}
                onChange={(e) => setVacancyIdDelete(e.target.value)}
                className={companyIdError ? "is-invalid" : ""}
              ></Form.Control>
              <Button
                variant="outline-danger"
                className="mt-2"
                onClick={deletVacancy}
              >
                Delete
              </Button>
            </Form>
          </div>
          <div
            style={{ height: "600px", width: "1715px", overflowY: "scroll" }}
          >
            <VacancyInfo Info={Info} />
          </div>
        </Modal.Body>
        <ToastContainer />
      </Modal>
    </div>
  );
}

export default DeleteVacancy;
