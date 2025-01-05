import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddSchool from "./components/addSchool";
import ShowSchools from "./components/showSchools";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddSchool />} />
        <Route path="/schools" element={<ShowSchools />} />
      </Routes>
    </Router>
  );
}

export default App;
