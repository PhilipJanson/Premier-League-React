import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { NavLink, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Nav, Navbar } from "react-bootstrap";

firebase.initializeApp({
  apiKey: "AIzaSyAOIJSQ7rYIqCn6njM7lC6HSNFPTMmubKs",
  authDomain: "premier-league-tips.firebaseapp.com",
  projectId: "premier-league-tips",
  storageBucket: "premier-league-tips.appspot.com",
  messagingSenderId: "171284413469",
  appId: "1:171284413469:web:76b1c4ddf404ebfd221af4",
  measurementId: "G-E6FJV64PJY",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  return (
    <>
      <NavBar />
      <Container className="App">
        <Outlet context="" />
      </Container>
    </>
  );
}

function NavBar() {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary shadow"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand>
          <img
            alt=""
            src="https://media.api-sports.io/football/leagues/39.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            style={{
              filter: "brightness(10000%)",
            }}
          />{" "}
          Premier League Tips
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <NavLink className="nav-link" to="/">
                Hem
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className="nav-link" to="/sign-in">
                Logga In
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className="nav-link" to="/sign-up">
                Skapa Konto
              </NavLink>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default App;
