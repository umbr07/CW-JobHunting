import React from "react";
import Table from "react-bootstrap/Table";

function VacancyInfo({ Info }) {
  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Company</th>
            <th>Job title</th>
            <th>Description</th>
            <th>Salary</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {Info.map((Info, i) => (
            <tr key={i}>
              <td style={{ width: "100px" }}>{Info.Id}</td>
              <td style={{ width: "100px" }}>{Info.Id_company}</td>
              <td style={{ width: "150px" }}>{Info.Job_title}</td>
              <td style={{ width: "150px" }}>{Info.Description}</td>
              <td style={{ width: "150px" }}>{Info.Salary}</td>
              <td style={{ width: "150px" }}>{Info.Location}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default VacancyInfo;
