import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function VacancyItem({ vacancy, loading }) {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div id="vacancy-list" style={{ width: "1300px" }}>
      {vacancy.map((vacancys, i) => (
        <Card id="card_vacancy" key={i}>
          <Card.Header as="h4">{vacancys.Job_title}</Card.Header>
          <Card.Body>
            <Card.Title>{vacancys.Description}</Card.Title>
            <Card.Text>{vacancys.Salary}</Card.Text>
            <Card.Text>{vacancys.Location}</Card.Text>
            <Button variant="primary">View a vacancy</Button>
            <Button variant="primary" id="apply_btn_vacancy">
              Apply
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
