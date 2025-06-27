import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import About from "./About";
import CopyrightPolicy from "./CopyrightPolicy";
import PrivacyPolicy from "./PrivacyPolicy";
import Contact from "./Contact";
import TermsOfService from "./TermsOfService";

export default function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/copyright-policy" element={<CopyrightPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
