import { API_KEY } from "./apiKey";
import { firestore } from "../App";
import { setDoc, doc, Timestamp } from "@firebase/firestore";

const LEAGUE_ID = 39;
const SEASON = "2023";

async function fetchTeams() {
  fetchFromApi("standings", false).then((data) => {
    data.response[0].league.standings[0].forEach(async (team) => {
      const teamData = {
        name: team.team.name,
        logo: team.team.logo,
        rank: team.rank,
        points: team.points,
        gamesPlayed: team.all.played,
        wins: team.all.win,
        draws: team.all.draw,
        losses: team.all.lose,
        goalsScored: team.all.goals.for,
        goalsConceded: team.all.goals.against,
        form: team.form,
      };

      await setDoc(
        doc(firestore, `teams-${SEASON}`, team.team.id.toString()),
        teamData
      );
    });
  });
}

async function fetchFixtures() {
  fetchFromApi("fixtures", true).then((data) => {
    data.response.forEach(async (fixture) => {
      const fixtureData = {
        round: fixture.league.round.split(" - ")[1],
        date: Timestamp.fromDate(new Date(fixture.fixture.date)),
        status: fixture.fixture.status.short,
        homeTeamId: fixture.teams.home.id,
        awayTeamId: fixture.teams.away.id,
        homeScore: fixture.goals.home,
        awayScore: fixture.goals.away,
        venue: fixture.fixture.venue.name,
        referee: fixture.fixture.referee,
      };

      await setDoc(
        doc(firestore, `fixtures-${SEASON}`, fixture.fixture.id.toString()),
        fixtureData
      );
    });
  });
}

async function fetchFromApi(endpoint, addTimezone) {
  const timezone = addTimezone ? "&timezone=Europe/Stockholm" : "";
  const url = `https://v3.football.api-sports.io/${endpoint}?season=${SEASON}&league=${LEAGUE_ID}${timezone}`;
  const requestOptions = {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": "v3.football.api-sports.io",
    },
  };

  return fetch(url, requestOptions).then((response) => {
    if (!response.ok) {
      throw new Error(`${url} returned status ${response.status}`);
    }

    handleHeaders(response.headers);
    return response.json();
  });
}

function handleHeaders(headers) {
  //Update remaining requests and timestamp
  headers.forEach((header) => console.log(header));
}

export { fetchTeams, fetchFixtures };
