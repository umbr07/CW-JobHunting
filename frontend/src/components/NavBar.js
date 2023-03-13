import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function NavBar() {
  return (
    <nav className="container">
      <a href="/" className="NameSite">
        Jobson
      </a>
      <ul className="NavigationLink">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">Profile</Link>
        </li>
      </ul>
    </nav>
  );
}
