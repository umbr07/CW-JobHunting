import React from "react";

const Pagination = ({ vacancyPerPage, totalVacancy, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalVacancy / vacancyPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li className="page-item" key={number}>
            <a
              id="pagination"
              className="page-link"
              onClick={() => paginate(number)}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
