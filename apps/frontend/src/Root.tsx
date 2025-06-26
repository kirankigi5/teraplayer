import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import About from "./About";
import CopyrightPolicy from "./CopyrightPolicy";

export default function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/copyright-policy" element={<CopyrightPolicy />} />
      </Routes>
    </Router>
  );
}
