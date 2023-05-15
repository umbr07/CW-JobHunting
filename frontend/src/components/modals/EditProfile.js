import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { EditUser } from "../../http/userAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditeProfile({ show, onHide, Info, UserInfoAxios }) {
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [Phone, setPhone] = useState("");

  const [FirstNameError, setFirstNameError] = useState(false);
  const [LastNameError, setLastNameError] = useState(false);
  const [PhoneNumberError, setPhoneNumberError] = useState(false);

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

  const EditInfoUser = async () => {
    if (!FirstNameError) {
      setFirstNameError(true);
    } else {
      setFirstNameError(false);
    }
    if (!LastNameError) {
      setLastNameError(true);
    } else {
      setLastNameError(false);
    }
    if (!PhoneNumberError) {
      setPhoneNumberError(true);
    } else {
      setPhoneNumberError(false);
    }
    if (FirstNameError && LastNameError && PhoneNumberError) {
      try {
        const response = await EditUser(Fname, Lname, Phone);
        console.log(response);
        UserInfoAxios();
        let success = "The vacancy was successfully added";
        successNotify(success);
      } catch (e) {
        let error = "Fill in all the fields correctly";
        errorNotify(error);
      }
    } else {
      let errors = "Fill in all the fields correctly";
      errorNotify(errors);
    }
  };

  useEffect(() => {
    setFname(Info.FirstName);
    setLname(Info.LastName);
    setPhone(Info.Phone);
  }, [Info]);

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
            placeholder={"Enter the first name"}
            value={Fname}
            onChange={(e) => setFname(e.target.value)}
            className={FirstNameError ? "is-invalid" : ""}
          ></Form.Control>
          <Form.Label className="mt-2">
            Last Name<span> *</span>
          </Form.Label>
          <Form.Control
            placeholder={"Enter the last name"}
            value={Lname}
            onChange={(e) => setLname(e.target.value)}
            className={LastNameError ? "is-invalid" : ""}
          ></Form.Control>
          <Form.Label className="mt-2">
            Phone Number<span> *</span>
          </Form.Label>
          <Form.Control
            placeholder={"Enter the Phone Number"}
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
            className={PhoneNumberError ? "is-invalid" : ""}
          ></Form.Control>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={EditInfoUser}>
          Edit
        </Button>
      </Modal.Footer>
      <ToastContainer />
    </Modal>
  );
}

export default EditeProfile;
