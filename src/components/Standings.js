import { useLoaderData } from "react-router";
import { Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faMinusCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function Standing() {
  const teams = useLoaderData();

  const dummyTeam = {
    rank: "#",
    name: "",
    gamesPlayed: "MP",
    wins: "W",
    draws: "D",
    losses: "L",
    goalsScored: "GF",
    goalsConceded: "GA",
    goalDifference: "GD",
    points: "Poäng",
  };

  return (
    <>
      <h1>Tabell</h1>
      <div className="text-responsive border shadow p-2 bg-white">
        <Team team={dummyTeam} />
        {teams.map((team) => {
          return <Team key={team.id} team={team} />;
        })}
      </div>
    </>
  );
}

function Team({ team }) {
  return (
    <Row className="text-center small border-bottom hover align-items-center py-1 m-0">
      <Col className="pr-0">{team.rank}</Col>
      <Col className="px-0">
        {(team.logo && (
          <Image src={team.logo} className="team-logo p-0"></Image>
        )) ||
          "Lag"}
      </Col>
      <Col className="text-start px-0" xs={3}>
        {team.name}
      </Col>
      <Col className="px-0">{team.gamesPlayed}</Col>
      <Col className="px-0">{team.wins}</Col>
      <Col className="px-0">{team.draws}</Col>
      <Col className="px-0">{team.losses}</Col>
      <Col className="px-0">{team.goalsScored}</Col>
      <Col className="px-0">{team.goalsConceded}</Col>
      <Col className="px-0">
        {team.goalDifference || team.goalsScored - team.goalsConceded}
      </Col>
      <Col className="fw-bold px-0">{team.points}</Col>
      <Col className="px-0" xs={1}>
        {team.form ? <Form form={team.form} rank={team.rank} /> : "Form"}
      </Col>
    </Row>
  );
}

function Form({ form, rank }) {
  return form.split("").map((char, index) => {
    const attr =
      char === "W"
        ? { icon: faCheckCircle, text: "text-success" }
        : char === "L"
        ? { icon: faTimesCircle, text: "text-danger" }
        : { icon: faMinusCircle, text: "text-secondary" };
    const key = `${char}-${rank}-${index}`;

    return <Icon attr={attr} key={key} />;
  });
}

function Icon({ attr }) {
  return (
    <>
      <FontAwesomeIcon
        className={`icon-responsive ${attr.text}`}
        icon={attr.icon}
      />{" "}
    </>
  );
}
