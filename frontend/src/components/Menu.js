import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/Style.css";
import { useContext } from "react";
import { Context } from "../index";
import { NavLink } from "react-router-dom";
import { HOME_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { LOGIN_ROUTE } from "../utils/consts";
import { SUPPORT_ROUTE } from "../utils/consts";
import { VACANCY_ROUTE } from "../utils/consts";
import { PROFILE_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";

const Menu = observer(() => {
  const history = useNavigate();
  const { user } = useContext(Context);

  const UserRole = localStorage.getItem("role");

  console.log(UserRole);

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    history("/home");
  };

  return (
    <Navbar expand="lg" id="Navbar">
      <Container>
        <Navbar.Brand>
          <NavLink id="Logo" to={HOME_ROUTE}>
            Jobson
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {user.isAuth ? (
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
              <Nav.Link>
                <NavLink id="navLabel" to={PROFILE_ROUTE}>
                  Profiles
                </NavLink>
              </Nav.Link>
            </Nav>
          ) : (
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
          )}
        </Navbar.Collapse>
        {user.isAuth && UserRole === "0" ? (
          <Nav>
            <Button
              variant="outline-primary"
              id="Log_out"
              onClick={() => logOut()}
            >
              Log out
            </Button>
          </Nav>
        ) : user.isAuth && UserRole === "1" ? (
          <Nav>
            <Button variant="outline-primary" onClick={() => history("/admin")}>
              Add Vacancy
            </Button>
            <Button
              variant="outline-primary"
              id="Log_out"
              onClick={() => logOut()}
            >
              Log out
            </Button>
          </Nav>
        ) : user.isAuth && UserRole === "2" ? (
          <Nav>
            <Button variant="outline-primary" onClick={() => history("/admin")}>
              Admin panel
            </Button>
            <Button
              variant="outline-primary"
              id="Log_out"
              onClick={() => logOut()}
            >
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
