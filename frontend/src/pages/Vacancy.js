import React from "react";
import Search from "../components/Search";
import { useState, useEffect } from "react";
import axios from "axios";
import VacancyItem from "../components/VacancyItem";
import Pagination from "../components/Pagination";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

function Vacancy() {
  const [searchTerm, setSearchTerm] = useState(" ");
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

  // const searchVacancyQuerry = async () => {
  //   setLoading(true);
  //   const res = await axios.get("http://localhost:5000/api/vacancysearch", {
  //     searchTerm,
  //   });
  // };

  const lastVacancyIndex = currentPage * vacancyPerPage;
  const firstVacancyIndex = lastVacancyIndex - vacancyPerPage;
  const currentVacancy = vacancy.slice(firstVacancyIndex, lastVacancyIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div id="search_container">
        <h3 id="search_text">
          With <span id="label">Jobson</span>, finding a dream job is much more
          convenient!
        </h3>
        <h3 id="search_text_middle">Try it now</h3>
        <Navbar expand="lg" id="form_search_container">
          <Container fluid>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Form
                className="d-flex"
                id="search_form"
                style={{ height: "47px" }}
              >
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="primary">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
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
