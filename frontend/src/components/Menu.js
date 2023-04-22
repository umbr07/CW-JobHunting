import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/Style.css";
import { useContext } from "react";
import { Context } from "..";
import { NavLink } from "react-router-dom";
import { HOME_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";

const Menu = observer(() => {
  const { user } = useContext(Context);
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <NavLink id="Logo" to={HOME_ROUTE}>
            Jobson
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <NavLink id="navLabel" to={HOME_ROUTE}>
                Home
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink id="navLabel">Support</NavLink>
            </Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        {user.isAuth ? (
          <Nav>
            <Button variant="outline-primary">Admin panel</Button>
            <Button variant="outline-primary" id="Log_out">
              Log out
            </Button>
          </Nav>
        ) : (
          <Button
            variant="outline-primary"
            onClick={() => user.setIsAuth(true)}
          >
            Log in
          </Button>
        )}
      </Container>
    </Navbar>
  );
});

export default Menu;
