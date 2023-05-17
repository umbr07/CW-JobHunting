import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import avatar from "../static/avatar.png";
import jwt_decode from "jwt-decode";
import EditProfile from "../components/modals/EditProfile";
import axios from "axios";
import SocialNetworkProfile from "../components/modals/SocialNetworkProfile";
import EditCompanyInfo from "../components/modals/EditCompanyInfo";
import { NavLink } from "react-router-dom";
import github from "../static/github-logo.png";
import linkedin from "../static/linkedin-sign.png";
import Spinner from "react-bootstrap/Spinner"; // Добавлено

export default function Profiles() {
  const jwt = localStorage.getItem("token");
  const decodedToken = jwt_decode(jwt, "secret12345");
  const userId = decodedToken.id;

  const UserRole = localStorage.getItem("role"); // Добавлено

  const [Info, setInfo] = useState([]);
  const [InfoNetwork, setInfoNetwork] = useState([]);
  const [InfoCompany, setInfoCompany] = useState([]);

  const [isLoading, setIsLoading] = useState(true); // Добавлено

  const UserInfoAxios = async () => {
    const res = await axios.get(
      `https://localhost:5000/api/usersinfo/${userId}`
    );
    setInfo(res.data);
  };

  const UserNetworkAxios = async () => {
    const res = await axios.get(
      `https://localhost:5000/api/usersinfonetwork/${userId}`
    );
    setInfoNetwork(res.data);
  };

  const InfoComapnyAxios = async () => {
    const res = await axios.get(
      `https://localhost:5000/api/infocompany/${userId}`
    );
    setInfoCompany(res.data);
  };

  useEffect(() => {
    // Добавлено
    setTimeout(() => {
      setIsLoading(true);
      const fetchData = async () => {
        await UserInfoAxios();
        await UserNetworkAxios();
        await InfoComapnyAxios();
        setIsLoading(false); // Установка isLoading в false после загрузки данных
      };
      fetchData();
    }, 1000);
  }, []);

  const [editInfoVisible, setEditInfoVisible] = useState(false);
  const [editNetworkVisible, seteditNetworkVisible] = useState(false);
  const [editCompanyInfokVisible, seteditCompanyInfokVisible] = useState(false);

  if (isLoading) {
    // Добавлено
    return (
      <div>
        <Spinner animation="border" id="loading" />
        <p id="loading-text">Loading...</p>
      </div>
    ); // Отображение сообщения о загрузке, пока данные загружаются
  }

  return (
    <div class="box flex">
      <div class="box-img">
        <Card style={{ width: "19rem" }} class="img" id="avatar_profile">
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
        {UserRole === "2" ? (
          " "
        ) : UserRole === "1" ? (
          <div>
            <Card
              class="black"
              style={{ width: "26rem", height: "19rem" }}
              id="information_more"
            >
              <Card.Body>
                <Card.Title id="profile_title">
                  Information about the company
                </Card.Title>
                <Card.Text>
                  Company name:{" "}
                  <strong>{InfoCompany ? InfoCompany.NameCompany : " "}</strong>
                </Card.Text>
                <Card.Text>
                  Location:{" "}
                  <strong>{InfoCompany ? InfoCompany.Location : " "}</strong>
                </Card.Text>
                <Card.Text>
                  Description:{" "}
                  <strong>{InfoCompany ? InfoCompany.Description : " "}</strong>
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => seteditCompanyInfokVisible(true)}
                >
                  Edit
                </Button>
              </Card.Body>
            </Card>
            <EditCompanyInfo
              show={editCompanyInfokVisible}
              onHide={() => seteditCompanyInfokVisible(false)}
              InfoCompany={InfoCompany}
              InfoComapnyAxios={InfoComapnyAxios}
            />
          </div>
        ) : (
          <div>
            <Card
              class="black"
              style={{ width: "26rem", height: "19rem" }}
              id="information_more"
            >
              <Card.Body>
                <Card.Title id="profile_title">
                  Information about the user
                </Card.Title>
                <Card.Text>
                  Specialization:{" "}
                  <strong>
                    {InfoNetwork ? InfoNetwork.Specialization : " "}
                  </strong>
                </Card.Text>
                <Card.Text>
                  Expirience:{" "}
                  <strong>{InfoNetwork ? InfoNetwork.Expirience : " "}</strong>
                </Card.Text>
                <Card.Text>
                  <img src={github} id="img_network" />{" "}
                  <strong>
                    <NavLink
                      to={InfoNetwork ? InfoNetwork.git_hub : ""}
                      target="_blank"
                    >
                      {InfoNetwork ? InfoNetwork.git_hub : ""}
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
                      {InfoNetwork ? InfoNetwork.linked_in : ""}
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
          </div>
        )}
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
