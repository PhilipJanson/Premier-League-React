import { createBrowserRouter } from "react-router-dom";
import { firestore } from "./App";
import { getDocs, collection } from "@firebase/firestore";
import App from "./App";
import Index from "./components/Index";
import Error from "./components/Error";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SignOut from "./components/SignOut";
import Admin from "./components/Admin";
import Standing from "./components/Standings";
import Profile from "./components/Profile";

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "/standings",
        loader: loadTeams,
        element: <Standing />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/profile/*",
        element: <Profile />
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/sign-out",
        element: <SignOut />,
      },
    ],
  },
]);

async function loadTeams() {
  const teamCollection = collection(firestore, "teams");
  const data = await getDocs(teamCollection);

  return data.docs
    .map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    })
    .sort((a, b) => a.rank - b.rank);
}

export default router;
