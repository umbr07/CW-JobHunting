import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import UsersInfo from "../UsersInfo";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { DeletUser } from "../../http/userAPI";

function DeleteUser({ show, onHide }) {
  const [Info, setInfo] = useState([]);
  const [userIdDelete, setUserIdDelete] = useState(" ");

  const loadUserInfo = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setInfo(res.data);
  };

  useEffect(() => {
    loadUserInfo();
  }, []);

  const deletUser = async () => {
    try {
      const response = await DeletUser(userIdDelete);
      console.log(response);
      loadUserInfo();
    } catch (e) {
      alert(e.response);
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
                Enter the user ID<span> *</span>
              </Form.Label>
              <Form.Control
                style={{ width: "280px" }}
                placeholder={"Enter the user ID"}
                value={userIdDelete}
                onChange={(e) => setUserIdDelete(e.target.value)}
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
      </Modal>
    </div>
  );
}

export default DeleteUser;
