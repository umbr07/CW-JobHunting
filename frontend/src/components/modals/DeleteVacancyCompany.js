import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import VacancyInfoCompany from "../VacancyInfoCompany";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { DeletVacancyCompany } from "../../http/userAPI";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DeleteVacancyCompany({ show, onHide }) {
  const jwt = localStorage.getItem("token");
  const decodedToken = jwt_decode(jwt, "secret12345");
  const userId = parseInt(decodedToken.id);

  const [Info, setInfo] = useState([]);
  const [vacancyIdDelete, setVacancyIdDelete] = useState(" ");
  const [idError, setIdError] = useState(false);

  const successNotify = () => {
    toast.success("You have successfully submitted your application!", {
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

  const errorNotify = () => {
    toast.error(`There is no such vacancy`, {
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
    const res = await axios.get(
      `http://localhost:5000/api/vacancyinfo/${userId}`
    );
    setInfo(res.data);
  };

  useEffect(() => {
    loadVacancyInfo();
  }, []);

  const deletVacancy = async () => {
    if (!idError) {
      setIdError(true);
      errorNotify();
    } else {
      setIdError(false);
    }
    if (idError) {
      try {
        const response = await DeletVacancyCompany(vacancyIdDelete, userId);
        console.log(response);
        loadVacancyInfo();
        successNotify();
      } catch (e) {
        errorNotify();
      }
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
                className={idError ? "is-invalid" : ""}
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
            <VacancyInfoCompany Info={Info} />
          </div>
        </Modal.Body>
        <ToastContainer />
      </Modal>
    </div>
  );
}

export default DeleteVacancyCompany;
