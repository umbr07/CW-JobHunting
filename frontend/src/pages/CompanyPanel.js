import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import CreateVacancyCompany from "../components/modals/CreateVacancyCompany";
import DeleteVacancyCompany from "../components/modals/DeleteVacancyCompany";

const CompanyPanel = () => {
  const [createVacancyVisible, setCreateVacancyVisible] = useState(false);
  const [deleteVacancyVisible, setDeleteVacancyVisible] = useState(false);

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
        Delete company vacancy
      </Button>

      <CreateVacancyCompany
        show={createVacancyVisible}
        onHide={() => setCreateVacancyVisible(false)}
      />
      <DeleteVacancyCompany
        show={deleteVacancyVisible}
        onHide={() => setDeleteVacancyVisible(false)}
      />
    </Container>
  );
};

export default CompanyPanel;
