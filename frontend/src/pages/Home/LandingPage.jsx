import React from "react";
import HeroSection from "./sections/HeroSection";
import Navbar from "../../components/Navbar/Navbar";
import AboutSection from "./sections/AboutSection";
import ContentSection from "./sections/ContentSection";
import ExploreSection from "./sections/ExploreSection";
import Footer from "../../components/Footer/Footer";
import { Fade } from "react-awesome-reveal";
const LandingPage = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Fade delay={4} cascade damping={0.4} duration={600}>
        <HeroSection />
      </Fade>
      <Fade delay={4}  damping={0.4} duration={600}>
        <AboutSection />
      </Fade>
      <Fade delay={4} cascade damping={0.4} duration={600}>
        <ContentSection />
      </Fade>
      <Fade delay={4} cascade damping={0.4} duration={600}>
        <ExploreSection />
      </Fade>
      <Fade delay={4}  damping={0.4} duration={600}>
        <Footer />
      </Fade>
    </React.Fragment>
  );
};

export default LandingPage;
