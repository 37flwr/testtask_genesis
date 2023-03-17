import React from "react";
import Nav from "react-bootstrap/Nav";

const NavBar = () => {
  return (
    <Nav
      variant="pills"
      defaultActiveKey="/home"
      className="flex gap-20 justify-content-center"
    >
      <Nav.Item>
        <Nav.Link href="/courses" eventKey="/courses">
          Courses
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
