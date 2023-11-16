import { Image } from "react-bootstrap";

export default function Index() {
  return (
    <>
      <Image src="https://media.api-sports.io/football/leagues/39.png"></Image>
      <h1>Premier League Tips</h1>
      <p>
        En webapplikation skapad för att visa matcher och resultat från Premier
        League, samt för att kunna tippa på resultaten. Skapa ett konto för att
        börja tippa. Hemsidan är skapad av Philip Janson och byggd med Python
        Flask, Bootstrap och JavaScript. Information om matcher och resultat
        hämtas från <a href="https://api-sports.io/">https://api-sports.io/</a>.
        Matchresultat och poäng uppdateras en gång om dagen vid{" "}
        <nobr>kl. 00.00.</nobr>
      </p>
    </>
  );
}
