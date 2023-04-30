import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";

export default function VacancyItem({ vacancy, loading }) {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div id="vacancy-list" style={{ width: "1300px" }}>
      {vacancy.map((vacancys, i) => (
        <Card id="card_vacancy" key={vacancys.id}>
          <Card.Header as="h4">{vacancys.Job_title}</Card.Header>
          <Card.Body>
            <Card.Title>{vacancys.Description}</Card.Title>
            <Card.Text>{vacancys.Salary}</Card.Text>
            <Card.Text>{vacancys.Location}</Card.Text>
            <Button variant="primary">Apply</Button>
            <NavLink>
              <Button variant="outline-primary" id="apply_btn_vacancy">
                View a vacancy
              </Button>
            </NavLink>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
