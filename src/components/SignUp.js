import { auth, googleProvider } from "../App";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";

export default function SignUp() {
  const context = useOutletContext();

  return (
    <>
      <h1>Skapa Konto</h1>
      <Container className="p-3">
        <GoogleSignUp context={context} />
        <div className="divider d-flex align-items-center my-4">
          <p className="text-center fw-light fw-italic mx-3 mb-0">Eller</p>
        </div>
        <EmailSignUp context={context} />
      </Container>
    </>
  );
}

function GoogleSignUp({ context }) {
  const handleSubmit = async () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        context.navigate("/");
        context.flash("success", "Konto Skapat!");
      })
      .catch((error) => {
        console.log(error.code, error.message);
        context.flash("danger", `Error ${error.code}: ${error.message}`);
      });
  };

  return (
    <Button variant="outline-primary" onClick={handleSubmit}>
      Skapa konto med Google
    </Button>
  );
}

function EmailSignUp({ context }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.classList.add("was-validated");

    if (!e.target.checkValidity()) {
      return;
    }

    if (password !== confirmPassword) {
      context.flash("danger", "Lösenorden stämmer inte överens.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        context.navigate("/");
        context.flash("success", "Konto Skapat!");
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
      <FormComponent
        type="password"
        controlId="formBasicPassword"
        onChange={setConfirmPassword}
        label="Upprepa lösenord"
        placeholder="Upprepa ditt lösenord"
      />
      <Button variant="outline-primary" type="submit">
        Skapa Konto
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
          e.target.parentElement.classList.add("was-validated");
          onChange(e.target.value);
        }}
        required
      />
    </Form.Group>
  );
}
