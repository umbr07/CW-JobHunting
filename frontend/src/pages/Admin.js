import React from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";

const Admin = () => {
  return (
    <Container className="d-flex flex-column">
      <Button variant={"outline-dark"}>Добавить вакансию</Button>
      <Button variant={"outline-dark"}>Удалить вакансию</Button>
      <Button variant={"outline-dark"}>Удалить пользователя</Button>
    </Container>
  );
};

export default Admin;
