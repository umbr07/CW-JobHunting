import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/Style.css";
import { useContext } from "react";
import { Context } from "..";
import { NavLink } from "react-router-dom";
import { HOME_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { LOGIN_ROUTE } from "../utils/consts";
import { SUPPORT_ROUTE } from "../utils/consts";
import { VACANCY_ROUTE } from "../utils/consts";

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
              <NavLink id="navLabel" to={VACANCY_ROUTE}>
                Vacancy
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink id="navLabel" to={SUPPORT_ROUTE}>
                Support
              </NavLink>
            </Nav.Link>
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
          <NavLink to={LOGIN_ROUTE}>
            <Button variant="outline-primary">Log in</Button>
          </NavLink>
        )}
      </Container>
    </Navbar>
  );
});

export default Menu;
