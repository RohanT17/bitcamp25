import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function MyNavBar() {
  return (
    <Navbar expand="lg" className="navbar-dark bg-dark custom-navbar">
      <Container>
        <Navbar.Brand href="/" className="brand-glow">
          🚀 StudyPilot
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/MindMap" className="nav-link-glow">
              Mind Map
            </Nav.Link>
            <Nav.Link href="/StudyAids" className="nav-link-glow">
              Study Aid
            </Nav.Link>
            <Nav.Link href="/FlashCards" className="nav-link-glow">
              Flash Cards
            </Nav.Link>

            <NavDropdown
              title="⚙️ More soon... ⬇️"
              id="basic-nav-dropdown"
              className="nav-link-glow"
            >
              <NavDropdown.Item href="#action/3.1">Quizzes</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Smart Notes
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavBar;