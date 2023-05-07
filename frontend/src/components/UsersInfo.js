import React from "react";
import Table from "react-bootstrap/Table";

function UsersInfo({ Info }) {
  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Mail</th>
            <th>Phone</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {Info.map((Info, i) => (
            <tr key={i}>
              <td style={{ width: "120px" }}>{Info.Id}</td>
              <td style={{ width: "450px" }}>{Info.Mail}</td>
              <td style={{ width: "150px" }}>{Info.Phone}</td>
              <td style={{ width: "150px" }}>{Info.FirstName}</td>
              <td style={{ width: "150px" }}>{Info.LastName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UsersInfo;
