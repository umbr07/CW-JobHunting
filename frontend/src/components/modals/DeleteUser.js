import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import UsersInfo from "../UsersInfo";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { DeletUser } from "../../http/userAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DeleteUser({ show, onHide }) {
  const [Info, setInfo] = useState([]);
  const [userIdDelete, setUserIdDelete] = useState("");

  const [userIdError, setUserIdError] = useState(false);

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

  const loadUserInfo = async () => {
    const res = await axios.get("https://localhost:5000/api/users");
    setInfo(res.data);
  };

  useEffect(() => {
    loadUserInfo();
  }, []);

  const deletUser = async () => {
    if (!userIdDelete) {
      setUserIdError(true);
    } else {
      setUserIdError(false);
    }
    if (userIdDelete) {
      try {
        const response = await DeletUser(userIdDelete);
        console.log(response);
        loadUserInfo();
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
          <Modal.Title>Users info panel</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex">
          <div style={{ height: "200px", width: "400px" }}>
            <Form>
              <Form.Label>
                User ID<span> *</span>
              </Form.Label>
              <Form.Control
                style={{ width: "280px" }}
                placeholder={"Enter the user ID"}
                value={userIdDelete}
                onChange={(e) => setUserIdDelete(e.target.value)}
                className={userIdError ? "is-invalid" : ""}
              ></Form.Control>
              <Button
                variant="outline-danger"
                className="mt-2"
                onClick={deletUser}
              >
                Delete
              </Button>
            </Form>
          </div>
          <div
            style={{ height: "600px", width: "1715px", overflowY: "scroll" }}
          >
            <UsersInfo Info={Info} />
          </div>
        </Modal.Body>
        <ToastContainer />
      </Modal>
    </div>
  );
}

export default DeleteUser;
