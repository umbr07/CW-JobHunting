import React from "react";
import Search from "../components/Search";
import { useState, useEffect } from "react";
import axios from "axios";
import VacancyItem from "../components/VacancyItem";

function Vacancy() {
  const [vacancy, setVacancy] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [vacancyPerPage] = useState(10);

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

  return (
    <div>
      <Search />
      <div className="container mt-5">
        <VacancyItem vacancy={vacancy} loading={loading} />
      </div>
    </div>
  );
}

export default Vacancy;
