import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import ViewVacancy from "./modals/ViewVacancy";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function VacancyItem({ vacancy, loading }) {
  const [VacancyVisible, setVacancyVisible] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState(null); /**/

  const successNotify = () => {
    toast.success("You have successfully submitted your application!", {
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
    toast.error(`Oops...something went wrong`, {
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

  const handleViewVacancy = (vacancy) => {
    setSelectedVacancy(vacancy);
    setVacancyVisible(true);
  };

  const appleVacancysUser = async (id_vacancy) => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      const id_user = decodedToken.id;
      console.log(id_user);

      const res = await axios.post("http://localhost:5000/api/vacancyapply", {
        id_user,
        id_vacancy,
      });
      successNotify();
    } catch (e) {
      errorNotify();
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div id="vacancy-list" style={{ width: "1300px" }}>
      {vacancy.map((vacancy, i) => (
        <Card id="card_vacancy" key={vacancy.id}>
          <Card.Header as="h4">{vacancy.Job_title}</Card.Header>
          <Card.Body>
            <Card.Title>{vacancy.Description}</Card.Title>
            <Card.Text>{vacancy.Salary}</Card.Text>
            <Card.Text>{vacancy.Location}</Card.Text>
            <Button
              variant="primary"
              onClick={() => appleVacancysUser(vacancy.Id)}
            >
              Apply
            </Button>
            <NavLink>
              <Button
                variant="outline-primary"
                id="apply_btn_vacancy"
                onClick={() => handleViewVacancy(vacancy)}
              >
                View a vacancy
              </Button>
            </NavLink>
          </Card.Body>
        </Card>
      ))}
      {selectedVacancy && (
        <ViewVacancy
          show={VacancyVisible}
          onHide={() => setVacancyVisible(false)}
          vacancy={selectedVacancy}
        />
      )}
      <ToastContainer />
    </div>
  );
}
