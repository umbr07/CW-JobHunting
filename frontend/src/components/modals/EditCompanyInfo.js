import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { EditInfoCompany } from "../../http/userAPI";

function EditCompanyInfo({ show, onHide, InfoCompany, InfoComapnyAxios }) {
  const [CompanyName, setCompanyName] = useState("");
  const [Location, setLocation] = useState("");
  const [Descriptions, setDescriptions] = useState("");

  const EditInfoCompanyUser = async () => {
    try {
      const response = await EditInfoCompany(
        CompanyName,
        Location,
        Descriptions
      );
      console.log(response);
      InfoComapnyAxios();
    } catch (e) {
      alert(e.response);
    }
  };

  useEffect(() => {
    setCompanyName(InfoCompany ? InfoCompany.NameCompany : " ");
    setLocation(InfoCompany ? InfoCompany.Location : " ");
    setDescriptions(InfoCompany ? InfoCompany.Description : " ");
  }, [InfoCompany]);

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
          Company information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>
            Company name<span> *</span>
          </Form.Label>
          <Form.Control
            placeholder={"Enter the Company name"}
            value={CompanyName}
            onChange={(e) => setCompanyName(e.target.value)}
          ></Form.Control>
          <Form.Label>
            Location<span> *</span>
          </Form.Label>
          <Form.Control
            placeholder={"Enter the Location"}
            value={Location}
            onChange={(e) => setLocation(e.target.value)}
          ></Form.Control>
          <Form.Label>
            Description<span> *</span>
          </Form.Label>
          <Form.Control
            placeholder={"Enter the Description"}
            value={Descriptions}
            onChange={(e) => setDescriptions(e.target.value)}
          ></Form.Control>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={EditInfoCompanyUser}>
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditCompanyInfo;
