import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import avatar from "../static/avatar.png";
import jwt_decode from "jwt-decode";
import EditProfile from "../components/modals/EditProfile";

export default function Profiles() {
  const [editInfoVisible, setEditInfoVisible] = useState(false);

  const jwt = localStorage.getItem("token");
  const decodedToken = jwt_decode(jwt, "secret12345");
  const userId = decodedToken.id;
  console.log(userId);

  return (
    <div class="box flex">
      <div class="box-img">
        <Card style={{ width: "18rem" }} class="img">
          <Card.Img variant="top" src={avatar} />
        </Card>
      </div>
      <div class="box-p flex">
        <Card class="black" style={{ width: "34rem" }}>
          <Card.Body>
            <Card.Title id="profile_title">Profiles</Card.Title>
            <Card.Text>
              First Name: <strong>{decodedToken.fname}</strong>
            </Card.Text>
            <Card.Text>
              Last Name: <strong>{decodedToken.lname}</strong>
            </Card.Text>
            <Card.Text>
              Email: <strong>{decodedToken.Mail}</strong>
            </Card.Text>
            <Card.Text>
              Phone Number: <strong>{decodedToken.phone}</strong>
            </Card.Text>
            <Button variant="primary" onClick={() => setEditInfoVisible(true)}>
              Edit
            </Button>
          </Card.Body>
        </Card>
        <EditProfile
          show={editInfoVisible}
          onHide={() => setEditInfoVisible(false)}
          decodedToken={decodedToken}
        />
      </div>
    </div>
  );
}
