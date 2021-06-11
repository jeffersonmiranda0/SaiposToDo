import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Tarefas from "./pages/Tarefas";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Tarefas} />
      </Switch>
    </BrowserRouter>
  );
}
