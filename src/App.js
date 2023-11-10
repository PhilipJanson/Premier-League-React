import "./App.css";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { NavLink, Outlet, useNavigation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Nav, Navbar, Alert, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";

const app = initializeApp({
  apiKey: "AIzaSyAOIJSQ7rYIqCn6njM7lC6HSNFPTMmubKs",
  authDomain: "premier-league-tips.firebaseapp.com",
  projectId: "premier-league-tips",
  storageBucket: "premier-league-tips.appspot.com",
  messagingSenderId: "171284413469",
  appId: "1:171284413469:web:76b1c4ddf404ebfd221af4",
  measurementId: "G-E6FJV64PJY",
});

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  useEffect(
    () =>
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      }),
    []
  );

  const [flashData, setFlashData] = useState({});
  const flash = (level, message) => {
    setFlashData({
      flash: true,
      level,
      message,
    });
  };

  const context = {
    navigate,
    flash,
    user,
  };

  return (
    <>
      <NavBar context={context} />
      <Flash flashData={flashData} setFlashData={setFlashData} />
      <Container className="text-center mt-3">
        {useNavigation().state === "loading" ? (
          <LoadingSpinner />
        ) : (
          <Outlet context={context} />
        )}
      </Container>
    </>
  );
}

function NavBar({ context }) {
  //Add
  const [toggled, setToggled] = useState();

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
            {!context.user && (
              <>
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
              </>
            )}
          </Nav>
          {context.user && (
            <Nav>
              <Navbar.Text>Inloggad som: </Navbar.Text>
              <Nav.Item>
                <NavLink className="nav-link" to="/profile">
                  {context.user.email}
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink className="nav-link" to="/sign-out">
                  Logga Ut
                </NavLink>
              </Nav.Item>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function Flash({ flashData, setFlashData }) {
  return (
    <>
      {flashData.flash ? (
        <Alert
          variant={flashData.level}
          onClose={() => setFlashData({ flash: false, level: "", message: "" })}
          dismissible
        >
          {flashData.message}
        </Alert>
      ) : (
        <></>
      )}
    </>
  );
}

function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Laddar...</span>
      </Spinner>
    </div>
  );
}

export default App;
export { auth, googleProvider };
