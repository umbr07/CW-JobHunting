import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";

function Search({ searchTerm, setSearchTerm }) {
  const [loading, setLoading] = useState(true);

  const searchVacancy = async (e) => {
    e.preventDefault();
    console.log(`Searching for ${searchTerm}...`);
  };

  if (loading) {
    return (
      <div>
        <Spinner animation="border" id="loading" />
        <p id="loading-text">Loading...</p>
      </div>
    );
  }

  return (
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
              <Button variant="primary" onClick={searchVacancy}>
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Search;
