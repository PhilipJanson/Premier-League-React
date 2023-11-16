import { Button } from "react-bootstrap";
import { fetchTeams, fetchFixtures } from "../api/apiHandler";
import { useOutletContext } from "react-router-dom";


export default function Admin() {
  const context = useOutletContext();

  const apiCall = async () => {
    fetchFixtures().then(() => {
      console.log("Done");
    }).catch(error => {
      console.err(error.code, error.message);
      context.flash("danger", `Error ${error.code}: ${error.message}`);
    });
  };

  return (
    <>
      <h1>Logga In</h1>
      <Button variant="outline-primary" onClick={apiCall}>
        API Call
      </Button>
    </>
  );
}
