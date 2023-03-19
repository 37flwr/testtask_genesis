import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import "./styles.scss";

const Navbar = () => (
  <Nav variant="pills" defaultActiveKey="/courses" className="basic-navbar">
    <Nav.Item>
      <Link className="basic-navbar__link" to="/courses?page=1">
        <Button>Courses</Button>
      </Link>
    </Nav.Item>
    <Nav.Item>
      <Link className="basic-navbar__link" to="/account">
        <Button>Account</Button>
      </Link>
    </Nav.Item>
  </Nav>
);

export default Navbar;
