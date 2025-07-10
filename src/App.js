import "./App.css";
import React, {  useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  } from "react-router-dom";

import HeroSnapScroller from "./fachowiec/pages/Mobile/HeroSnapScroller/HeroSnapScroller";
import Fachowiec from "./fachowiec/pages/Fachowiec";

function App() {
  const [user, setUser] = useState(null);






 

  return (
    <div>
      <Routes>
        {/* Ustawiamy komponent Fachowiec na ścieżce głównej */}
        <Route path="/" element={<Fachowiec user={user} />} />
        <Route path="/fach" element={<Fachowiec user={user} />} />
        <Route path="/hero" element={<HeroSnapScroller user={user} />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
