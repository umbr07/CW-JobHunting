import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../Styles/Style.css";
import { useState } from "react";
import { registration } from "../http/userAPI";

function Registration() {
  const [Mail, setEmail] = useState(" ");
  const [Password, setPassword] = useState(" ");
  const [FirstName, setFname] = useState(" ");
  const [LastName, setLname] = useState(" ");
  const [Phone, setPhone] = useState(" ");

  const regin = async () => {
    const response = await registration(
      Mail,
      Password,
      FirstName,
      LastName,
      Phone
    );
    console.log(response);
  };

  return (
    <div>
      <Form
        style={{
          position: "absolute",
          left: "50%",
          top: "35%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h1 class="text-center mb-4 text-primary">Jobson</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
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
          <Form.Label>Password</Form.Label>
          <Form.Control
            style={{ width: "350px", height: "40px" }}
            type="password"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            style={{ width: "350px", height: "40px" }}
            type="text"
            placeholder="First Name"
            value={FirstName}
            onChange={(e) => setFname(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            style={{ width: "350px", height: "40px" }}
            type="text"
            placeholder="Last Name"
            value={LastName}
            onChange={(e) => setLname(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            style={{ width: "350px", height: "40px" }}
            type="text"
            placeholder="Phone Number"
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
          />
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
    </div>
  );
}

export default Registration;
