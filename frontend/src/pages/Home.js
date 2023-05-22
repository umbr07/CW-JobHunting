import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { VACANCY_ROUTE } from "../utils/consts";
import { Link } from "react-router-dom";
import React, { useState } from "react";

function Home() {
  const [time, setTime] = useState("");

  const ws = new WebSocket("ws://localhost:5001");
  ws.onmessage = (message) => {
    setTime(message.data);
  };

  return (
    <Card className="text-center">
      <Card.Body style={{ height: "230px" }}>
        <Card.Title class="card-title h3" id="title_home_page">
          <span id="label">Jobson</span> is convenient in everything.
        </Card.Title>
        <Card.Text class="card-title h6">
          This application is designed to find a job in the IT field. Easy to
          use and user-friendly design makes it understandable for users of any
          category.
        </Card.Text>
        <Link id="btn" to={VACANCY_ROUTE}>
          <Button variant="primary" id="btn_go_vacancies">
            Go to job search
          </Button>
        </Link>
      </Card.Body>
      <div>
        <h3>While you're looking for a job, the clock is ticking</h3>
        <p>{time}</p>
      </div>
    </Card>
  );
}

export default Home;
