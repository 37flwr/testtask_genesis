import React from "react";
import { Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Nav
      variant="pills"
      defaultActiveKey="/courses"
      className="flex gap-20 justify-content-center navbar"
      style={{ marginBottom: "15px", gap: "20px" }}
    >
      <Nav.Item>
        <Link
          style={{ color: "black", textDecoration: "none" }}
          to="/courses?page=1"
        >
          <Button>Courses</Button>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link style={{ color: "black", textDecoration: "none" }} to="/account">
          <Button>Account</Button>
        </Link>
      </Nav.Item>
    </Nav>
  );
};

export default NavBar;
