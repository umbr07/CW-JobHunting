import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import descript from "../static/hastag.png";
import map from "../static/map.png";
import money from "../static/salary.png";

function History() {
  const jwt = localStorage.getItem("token");
  const decodedToken = jwt_decode(jwt, "secret12345");
  const userId = decodedToken.id;

  const [historyApply, setHistoryApply] = useState([]);

  useEffect(() => {
    const getHistoryApply = async () => {
      const res = await axios.get(
        `https://localhost:5000/api/vacancyapply/${userId}`
      );
      setHistoryApply(res.data);
      console.log(res.data);
    };
    getHistoryApply();
  }, []);

  return (
    <div
      style={{ height: "980px", width: "1400px" }}
      className="container mt-5"
    >
      {historyApply.map((historyApply, i) => (
        <Card id="card_vacancy">
          <Card.Header as="h4">{historyApply.Vacancys.Job_title}</Card.Header>
          <Card.Body>
            <Card.Title>
              <img src={descript} id="img_descript" />
              {historyApply.Vacancys.Description}
            </Card.Title>
            <Card.Text>
              <img src={money} id="img_descript" />
              {historyApply.Vacancys.Salary}
            </Card.Text>
            <Card.Text>
              <img src={map} id="img_descript" />
              {historyApply.Vacancys.Location}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default History;
