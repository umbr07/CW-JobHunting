import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";

function Search() {
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
              />
              <Button variant="primary">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Search;
