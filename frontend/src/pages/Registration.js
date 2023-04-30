import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../Styles/Style.css";
import { useState } from "react";
import { registration } from "../http/userAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserStore from "../store/UserStore";
import { NavLink } from "react-router-dom";
import { REGISTRATION_COMPANY_ROUTE } from "../utils/consts";

function Registration() {
  const [Mail, setEmail] = useState(" ");
  const [Password, setPassword] = useState(" ");
  const [FirstName, setFname] = useState(" ");
  const [LastName, setLname] = useState(" ");
  const [Phone, setPhone] = useState(" ");

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
      const response = await registration(
        Mail,
        Password,
        FirstName,
        LastName,
        Phone
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
          top: "43%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h1 class="text-center mb-4 text-primary">Jobson</h1>
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
        <Form.Group className="mb-3" controlId="formBasicFName">
          <Form.Label>
            First Name<span> *</span>
          </Form.Label>
          <Form.Control
            style={{ width: "350px", height: "40px" }}
            type="text"
            placeholder="First Name"
            value={FirstName}
            onChange={(e) => setFname(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLName">
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
        <Form.Group className="mb-3" controlId="formBasicPNumber">
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
        </Form.Group>
        <Button
          onClick={regin}
          style={{ width: "165px" }}
          id="reg_But_com"
          variant="primary"
        >
          Registration
        </Button>
        <NavLink id="reg_comp" to={REGISTRATION_COMPANY_ROUTE}>
          <p class="text-center mb-4 text-primary" id="reg_comp_p">
            Register an account to search for employees
          </p>
        </NavLink>
      </Form>
      <ToastContainer />
    </div>
  );
}

export default Registration;
