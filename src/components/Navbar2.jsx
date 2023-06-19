import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function Navbar2() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Collapse className="justify-content-center">
          <Nav className="w-100 justify-content-start">
            {" "}
            {/* Added justify-content-start class */}
            <Nav.Link
              as={Link}
              to="/laptop"
              className="text-white flex-fill text-center"
            >
              Laptops
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/tablets"
              className="text-white flex-fill text-center"
            >
              Tablets
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/cameras"
              className="text-white flex-fill text-center"
            >
              Cameras
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/phone"
              className="text-white flex-fill text-center"
            >
              Cell Phones
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/accessories" className="text-white">
              Accessories
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Navbar2;
