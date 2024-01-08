import React from "react";
import HeroSection from "./sections/HeroSection";
import Navbar from "../../components/Navbar/Navbar";
import AboutSection from "./sections/AboutSection";
import ContentSection from "./sections/ContentSection";
import ExploreSection from "./sections/ExploreSection";
import Footer from "../../components/Footer/Footer";
const LandingPage = () => {
  return (
    <React.Fragment>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ContentSection />
      <ExploreSection />
      <Footer/>
    </React.Fragment>
  );
};

export default LandingPage;
