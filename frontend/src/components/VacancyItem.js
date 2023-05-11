import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import ViewVacancy from "./modals/ViewVacancy";

export default function VacancyItem({ vacancy, loading }) {
  const [VacancyVisible, setVacancyVisible] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState(null); /**/

  const handleViewVacancy = (vacancy) => {
    setSelectedVacancy(vacancy);
    setVacancyVisible(true);
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
            <Button variant="primary">Apply</Button>
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
    </div>
  );
}
