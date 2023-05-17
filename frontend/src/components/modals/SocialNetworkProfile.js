import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { EditNetworkUser } from "../../http/userAPI";

function SocialNetworkProfile({ show, onHide, InfoNetwork, UserNetworkAxios }) {
  const [Specialization, setSpecialization] = useState("");
  const [Expirience, setExpirience] = useState("");
  const [GitHub, setGitHub] = useState("");
  const [LinkedIn, setLinkedIn] = useState("");

  const EditInfoNetworkUser = async () => {
    try {
      const response = await EditNetworkUser(
        Specialization,
        Expirience,
        GitHub,
        LinkedIn
      );
      console.log(response);
      UserNetworkAxios();
    } catch (e) {
      alert(e.response);
    }
  };

  useEffect(() => {
    setSpecialization(InfoNetwork ? InfoNetwork.Specialization : " ");
    setExpirience(InfoNetwork ? InfoNetwork.Expirience : " ");
    setGitHub(InfoNetwork ? InfoNetwork.git_hub : " ");
    setLinkedIn(InfoNetwork ? InfoNetwork.linked_in : " ");
  }, [InfoNetwork]);

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
          Social network
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>
            Specialization<span> *</span>
          </Form.Label>
          <Form.Control
            placeholder={"Enter the Specialization"}
            value={Specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          ></Form.Control>
          <Form.Label>
            Expirience<span> *</span>
          </Form.Label>
          <Form.Control
            placeholder={"Enter the Expirience"}
            value={Expirience}
            onChange={(e) => setExpirience(e.target.value)}
          ></Form.Control>
          <Form.Label>
            GitHub<span> *</span>
          </Form.Label>
          <Form.Control
            placeholder={"Enter the GitHub"}
            value={GitHub}
            onChange={(e) => setGitHub(e.target.value)}
          ></Form.Control>
          <Form.Label className="mt-2">
            LinkedIn<span> *</span>
          </Form.Label>
          <Form.Control
            placeholder={"Enter the LinkedIn"}
            value={LinkedIn}
            onChange={(e) => setLinkedIn(e.target.value)}
          ></Form.Control>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={EditInfoNetworkUser}>
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SocialNetworkProfile;
