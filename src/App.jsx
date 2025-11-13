import React from "react";
import Hero from "./sections/Hero.jsx";
import Showcase from "./sections/Showcase.jsx";
import Navbar from "./components/Navbar.jsx";
import LogoSection from "./sections/LogoSection.jsx";

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Showcase />
      <LogoSection />
    </>
  );
};

export default App;
