import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import descript from "../../static/hastag.png";
import map from "../../static/map.png";
import money from "../../static/salary.png";

function ViewVacancy({ show, onHide, vacancy }) {
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

  const errorNotify = (e) => {
    toast.error(`Oops...something went wrong`, {
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

  const applyVacancy = async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      const id_user = decodedToken.id;
      console.log(id_user);
      const id_vacancy = vacancy.Id;

      const res = await axios.post("https://localhost:5000/api/vacancyapply", {
        id_user,
        id_vacancy,
      });
      successNotify();
    } catch (e) {
      errorNotify();
    }
  };

  return (
    <div>
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
          <p>
            <img src={descript} id="img_descript" />
            <strong>Description:</strong> {vacancy.Description}
          </p>
          <p>
            <img src={money} id="img_descript" />
            <strong>Per month:</strong> {vacancy.Salary}
          </p>
          <p>
            <img src={map} id="img_descript" />
            <strong>Location:</strong> {vacancy.Location}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={applyVacancy}>
            Apply
          </Button>
        </Modal.Footer>
        <ToastContainer />
      </Modal>
    </div>
  );
}

export default ViewVacancy;
