import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Menu from "./components/Menu";

const App = () => {
  return (
    <BrowserRouter>
      <Menu />
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
