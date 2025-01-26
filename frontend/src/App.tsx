import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";

import "./App.scss";
import Users from "./user/pages/Users";
import Movies from "./movies/pages/Movies";
import Dashboard from "./dashboard/pages/Dashboard";
import Theaters from "./theaters/pages/Theaters";
import Header from "./dashboard/components/Header";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/users" Component={Users}></Route>
          <Route path="/movies" Component={Movies}></Route>
          <Route path="/theaters" Component={Theaters}></Route>
          <Route path="/" Component={Dashboard}></Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
