import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import avatar from "../static/avatar.png";
import jwt_decode from "jwt-decode";
import EditProfile from "../components/modals/EditProfile";
import axios from "axios";

export default function Profiles() {
  const jwt = localStorage.getItem("token");
  const decodedToken = jwt_decode(jwt, "secret12345");
  const userId = decodedToken.id;

  const [Info, setInfo] = useState([]);

  const UserInfoAxios = async () => {
    const res = await axios.get("http://localhost:5000/api/usersinfo", {
      userId,
    });
    setInfo(res.data);
  };

  useEffect(() => {
    UserInfoAxios();
  }, []);

  const [editInfoVisible, setEditInfoVisible] = useState(false);

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
              First Name: <strong>{Info.FirstName}</strong>
            </Card.Text>
            <Card.Text>
              Last Name: <strong>{Info.LastName}</strong>
            </Card.Text>
            <Card.Text>
              Email: <strong>{Info.Mail}</strong>
            </Card.Text>
            <Card.Text>
              Phone Number: <strong>{Info.Phone}</strong>
            </Card.Text>
            <Button variant="primary" onClick={() => setEditInfoVisible(true)}>
              Edit
            </Button>
          </Card.Body>
        </Card>
        <EditProfile
          show={editInfoVisible}
          onHide={() => setEditInfoVisible(false)}
          Info={Info}
        />
      </div>
      <div class="box-img">
        <Card class="black" style={{ width: "25rem" }} id="information_more">
          <Card.Body>
            <Card.Title id="profile_title">Information</Card.Title>
            <Card.Text>
              GitHub: <strong></strong>
            </Card.Text>
            <Card.Text>
              Linkedin: <strong></strong>
            </Card.Text>
            <Button variant="primary" onClick={() => setEditInfoVisible(true)}>
              Add information
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
