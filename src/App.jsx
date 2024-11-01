import "./App.css";
import AppRouter from "./AppRouter";
import { useContext, useEffect } from "react";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { type } from "./Utility/action.type";
import { auth } from "./Utility/firebase";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        dispatch({
          type: type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: type.SET_USER,
          user: null,
        });
      }
    });
  }, []);
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
