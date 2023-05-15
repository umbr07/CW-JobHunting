import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import avatar from "../static/avatar.png";
import jwt_decode from "jwt-decode";
import EditProfile from "../components/modals/EditProfile";
import axios from "axios";
import SocialNetworkProfile from "../components/modals/SocialNetworkProfile";
import { NavLink } from "react-router-dom";
import github from "../static/github-logo.png";
import linkedin from "../static/linkedin-sign.png";

export default function Profiles() {
  const jwt = localStorage.getItem("token");
  const decodedToken = jwt_decode(jwt, "secret12345");
  const userId = decodedToken.id;

  const [Info, setInfo] = useState([]);
  const [InfoNetwork, setInfoNetwork] = useState([]);

  const UserInfoAxios = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/usersinfo/${userId}`
    );
    setInfo(res.data);
  };

  const UserNetworkAxios = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/usersinfonetwork/${userId}`
    );
    setInfoNetwork(res.data);
  };

  //Доделать часть, что когда данные в нетворке есть и их надо изменить мы кидаем маршрут на апдейт
  //Если данных в таблице нету, мы кидаем маршрут на создание
  //const updateNetworkInfo = async () => {};

  useEffect(() => {
    UserInfoAxios();
    UserNetworkAxios();
  }, []);

  const [editInfoVisible, setEditInfoVisible] = useState(false);
  const [editNetworkVisible, seteditNetworkVisible] = useState(false);

  return (
    <div class="box flex">
      <div class="box-img">
        <Card style={{ width: "18rem" }} class="img" id="avatar_profile">
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
          UserInfoAxios={UserInfoAxios}
        />
      </div>
      <div>
        {" "}
        <Card
          class="black"
          style={{ width: "25.5rem", height: "18rem" }}
          id="information_more"
        >
          <Card.Body>
            <Card.Title id="profile_title">Social network</Card.Title>
            <Card.Text>
              <img src={github} id="img_network" />{" "}
              <strong>
                <NavLink
                  to={InfoNetwork ? InfoNetwork.git_hub : ""}
                  target="_blank"
                >
                  {InfoNetwork ? InfoNetwork.git_hub : " "}
                </NavLink>
              </strong>
            </Card.Text>
            <Card.Text>
              <img src={linkedin} id="img_network" />{" "}
              <strong>
                <NavLink
                  to={InfoNetwork ? InfoNetwork.linked_in : ""}
                  target="_blank"
                >
                  {InfoNetwork ? InfoNetwork.linked_in : " "}
                </NavLink>
              </strong>
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => seteditNetworkVisible(true)}
            >
              Edit
            </Button>
          </Card.Body>
        </Card>
        <SocialNetworkProfile
          show={editNetworkVisible}
          onHide={() => seteditNetworkVisible(false)}
          InfoNetwork={InfoNetwork}
          UserNetworkAxios={UserNetworkAxios}
        />
      </div>
    </div>
  );
}
