import { useRouteError } from "react-router-dom";
import { Container, Image } from "react-bootstrap";

export default function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <Container className="text-center p-4">
      <Image
        src="https://media.api-sports.io/football/leagues/39.png"
        roundedCircle
      />
      <h1>Ups...</h1>
      <p>Något gick fel</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </Container>
  );
}
