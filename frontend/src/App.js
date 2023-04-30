import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Context } from "./index";
import AppRouter from "./components/AppRouter";
import Menu from "./components/Menu";
import { check } from "../src/http/userAPI";
import Spinner from "react-bootstrap/Spinner";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      check()
        .then((data) => {
          user.setUser(true);
          user.setIsAuth(true);
        })
        .finally(() => setLoading(false));
    }, 1000);
  }, []);

  if (loading) {
    return <Spinner animation={"grow"} />;
  }

  return (
    <BrowserRouter>
      <Menu />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
