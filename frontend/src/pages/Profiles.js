import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import avatar from "../static/avatar.png";
import jwt_decode from "jwt-decode";

export default function Profiles() {
  //Чтобы получить информацию о пользователе, я должен декодировать токен и вытащить из него почту
  //Далее подключить userApi, чтобы послать на бэк почту и вернуть информацию о пользователе на фронт
  //После чего уже через цикл map сделать вывод информации
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
            <Card.Text>First Name: {userId}</Card.Text>
            <Card.Text>LastName: </Card.Text>
            <Card.Text>Email: </Card.Text>
            <Card.Text>Phone Number: </Card.Text>
            <Button variant="primary">Edit</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
