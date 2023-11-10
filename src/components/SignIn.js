import { auth, googleProvider } from "../App";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useOutletContext, useNavigate } from "react-router-dom";

export default function SignUp() {
  const context = useOutletContext();

  return (
    <>
      <h1>Logga In</h1>
      <Container className="p-3">
        <GoogleSignIn context={context} />
        <div className="divider d-flex align-items-center my-4">
          <p className="text-center fw-light fw-italic mx-3 mb-0">Eller</p>
        </div>
        <EmailSignIn context={context} />
      </Container>
    </>
  );
}

function GoogleSignIn({ context }) {
  const handleSubmit = async () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        context.navigate("/");
        context.flash("success", "Inloggad!");
      })
      .catch((error) => {
        console.log(error.code, error.message);
        context.flash("danger", `Error ${error.code}: ${error.message}`);
      });
  };

  return (
    <Button variant="outline-primary" onClick={handleSubmit}>
      Logga in med Google
    </Button>
  );
}

function EmailSignIn({ context }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
        context.flash("success", "Inloggad!");
      })
      .catch((error) => {
        console.log(error.code, error.message);
        context.flash("danger", `Error ${error.code}: ${error.message}`);
      });
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <FormComponent
        type="email"
        controlId="formBasicEmail"
        onChange={setEmail}
        label="Email"
        placeholder="Skriv din email"
      />
      <FormComponent
        type="password"
        controlId="formBasicPassword"
        onChange={setPassword}
        label="Lösenord"
        placeholder="Skriv ditt lösenord"
      />
      <Button variant="outline-primary" type="submit">
        Logga In
      </Button>
    </Form>
  );
}

function FormComponent({ type, controlId, onChange, label, placeholder }) {
  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        required
      />
    </Form.Group>
  );
}
