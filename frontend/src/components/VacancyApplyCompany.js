import Table from "react-bootstrap/Table";
import jwt_decode from "jwt-decode";
import React, { useState, useEffect } from "react";
import axios from "axios";

function VacancyApplyCompany({ Info }) {
  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID vacancies</th>
            <th>ID user</th>
            <th>Mail</th>
            <th>Phone</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Specialization</th>
            <th>Expirience</th>
            <th>GitHub</th>
            <th>LinkedIn</th>
          </tr>
        </thead>
        <tbody>
          {Info.map((Info, i) => (
            <tr key={i}>
              <td style={{ width: "150px" }}>{Info.Id}</td>
              <td style={{ width: "150px" }}>{Info.Id_vacancies}</td>
              <td style={{ width: "150px" }}>{Info.Id_user}</td>
              <td style={{ width: "170px" }}>{Info.Mail}</td>
              <td style={{ width: "170px" }}>{Info.Phone}</td>
              <td style={{ width: "170px" }}>{Info.FirstName}</td>
              <td style={{ width: "170px" }}>{Info.LastName}</td>
              <td style={{ width: "170px" }}>{Info.Specialization}</td>
              <td style={{ width: "170px" }}>{Info.Expirience}</td>
              <td style={{ width: "170px" }}>{Info.git_hub}</td>
              <td style={{ width: "170px" }}>{Info.linked_in}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default VacancyApplyCompany;
