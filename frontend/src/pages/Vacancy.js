import React from "react";
import Search from "../components/Search";
import { useState, useEffect } from "react";
import axios from "axios";
import VacancyItem from "../components/VacancyItem";
import Pagination from "../components/Pagination";

function Vacancy() {
  const [vacancy, setVacancy] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [vacancyPerPage] = useState(5);

  useEffect(() => {
    const getVacancy = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/vacancy");
      setVacancy(res.data);
      setLoading(false);
      console.log(res.data);
    };
    getVacancy();
  }, []);

  const lastVacancyIndex = currentPage * vacancyPerPage;
  const firstVacancyIndex = lastVacancyIndex - vacancyPerPage;
  const currentVacancy = vacancy.slice(firstVacancyIndex, lastVacancyIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Search />
      <div className="container mt-5">
        <VacancyItem vacancy={currentVacancy} loading={loading} />
        <Pagination
          vacancyPerPage={vacancyPerPage}
          totalVacancy={vacancy.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export default Vacancy;
