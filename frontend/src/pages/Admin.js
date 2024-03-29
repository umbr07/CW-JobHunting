import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import CreateVacancy from "../components/modals/CreateVacancy";
import DeleteUser from "../components/modals/DeleteUser";
import DeleteVacancy from "../components/modals/DeleteVacancy";

const Admin = () => {
  const [createVacancyVisible, setCreateVacancyVisible] = useState(false);
  const [deleteVacancyVisible, setDeleteVacancyVisible] = useState(false);
  const [deleteUserVisible, setDeleteUserVisible] = useState(false);

  return (
    <Container className="d-flex flex-column">
      <Button
        variant={"primary"}
        className="mt-4 p-2"
        onClick={() => setCreateVacancyVisible(true)}
      >
        Add vacancy
      </Button>
      <Button
        variant={"primary"}
        className="mt-2 p-2"
        onClick={() => setDeleteVacancyVisible(true)}
      >
        Delete vacancy
      </Button>
      <Button
        variant={"primary"}
        className="mt-2 p-2"
        onClick={() => setDeleteUserVisible(true)}
      >
        Delete user
      </Button>
      <CreateVacancy
        show={createVacancyVisible}
        onHide={() => setCreateVacancyVisible(false)}
      />
      <DeleteVacancy
        show={deleteVacancyVisible}
        onHide={() => setDeleteVacancyVisible(false)}
      />
      <DeleteUser
        show={deleteUserVisible}
        onHide={() => setDeleteUserVisible(false)}
      />
    </Container>
  );
};

export default Admin;
