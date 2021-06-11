import React from "react";
// import "./App.css";

// import logo from "./assets/logo.svg";

import Routes from "./routes";

function App() {
  return (
    <div className="container-fluid">
      <div className="mt-3 mb-5">
        <img src="https://materiais.saipos.com/hs-fs/hubfs/Ativo-5.png?width=300&height=83&name=Ativo-5.png" />
      </div>
      <div className="content">
        <Routes />
      </div>
    </div>
  );
}

export default App;
