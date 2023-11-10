import { auth } from "../App";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function SignOut() {
  const context = useOutletContext();

  useEffect(() => {
    signOut(auth)
      .then(() => {
        context.navigate("/sign-in");
        context.flash("success", "Utloggad!");
      })
      .catch((error) => {
        console.log(error.code, error.message);
        context.flash("danger", `Error ${error.code}: ${error.message}`);
      });
  });

  return;
}
