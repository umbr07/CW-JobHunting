import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../Styles/Style.css";
import { useState } from "react";
import { regCompany } from "../http/userAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CompanyReg() {
  const [Mail, setEmail] = useState(" ");
  const [Password, setPassword] = useState(" ");
  const [FirstName, setFname] = useState(" ");
  const [LastName, setLname] = useState(" ");
  const [Phone, setPhone] = useState(" ");
  const [NameCompany, setNameCompany] = useState(" ");
  const [Location, setLocation] = useState(" ");

  const successNotify = () => {
    toast.success("The account has been successfully registered!", {
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
    toast.error(`Account creation error.`, {
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

  const regin = async () => {
    try {
      const response = await regCompany(
        Mail,
        Password,
        FirstName,
        LastName,
        Phone,
        NameCompany,
        Location
      );
      console.log(response);
      successNotify();
    } catch (e) {
      errorNotify();
    }
  };

  return (
    <div>
      <Form
        style={{
          position: "absolute",
          left: "50%",
          top: "51%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h1 class="text-center mb-4 text-primary">Jobson.corp</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            Email address<span> *</span>
          </Form.Label>
          <Form.Control
            required
            style={{ width: "350px", height: "40px" }}
            type="email"
            placeholder="Enter email"
            value={Mail}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            Password<span> *</span>
          </Form.Label>
          <Form.Control
            style={{ width: "350px", height: "40px" }}
            type="password"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            First Name<span> *</span>
          </Form.Label>
          <Form.Control
            style={{ width: "350px", height: "40px" }}
            type="text"
            placeholder="Enter First Name"
            value={FirstName}
            onChange={(e) => setFname(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            Last Name<span> *</span>
          </Form.Label>
          <Form.Control
            style={{ width: "350px", height: "40px" }}
            type="text"
            placeholder="Last Name"
            value={LastName}
            onChange={(e) => setLname(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            Phone Number<span> *</span>
          </Form.Label>
          <Form.Control
            style={{ width: "350px", height: "40px" }}
            type="text"
            placeholder="Phone Number"
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Form.Text className="text-muted">
            The company's current phone number.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            Name company<span> *</span>
          </Form.Label>
          <Form.Control
            style={{ width: "350px", height: "40px" }}
            type="text"
            placeholder="Phone Number"
            value={NameCompany}
            onChange={(e) => setNameCompany(e.target.value)}
          />
          <Form.Text className="text-muted">Valid company name.</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            Location<span> *</span>
          </Form.Label>
          <Form.Control
            style={{ width: "350px", height: "40px" }}
            type="text"
            placeholder="Phone Number"
            value={Location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Form.Text className="text-muted">
            The country or city where the company is located.
          </Form.Text>
        </Form.Group>
        <Button
          onClick={regin}
          style={{ width: "165px" }}
          id="reg_But_com"
          variant="primary"
        >
          Registration
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
}

export default CompanyReg;
