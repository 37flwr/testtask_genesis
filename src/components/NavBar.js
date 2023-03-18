import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Nav
      variant="pills"
      defaultActiveKey="/courses"
      className="flex gap-20 justify-content-center"
    >
      <Nav.Item>
        <Nav.Link eventKey="/courses">
          <Link style={{ color: "white" }} to="/courses?page=1">
            Courses
          </Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/account" disabled>
          Account
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default NavBar;
