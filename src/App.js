import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import HeroSnapScroller from "./fachowiec/pages/Mobile/HeroSnapScroller/HeroSnapScroller";
import Fachowiec from "./fachowiec/pages/Fachowiec";

function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [showFlyout, setShowFlyout] = useState(false);





  useEffect(() => {
    const interval = setInterval(() => {
      setShowFlyout(true);
      setTimeout(() => setShowFlyout(false), 4000); // pokazuj na 4 sekundy
    }, Math.random() * 20000 + 10000); // co 10-30 sekund losowo
    return () => clearInterval(interval);
  }, []);

 

  return (
    <div>
      <Routes>
        <Route
          path="/"
          
        />
        
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
