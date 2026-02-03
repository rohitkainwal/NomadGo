import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import MovingCarousel from "../components/MovingCarousel";
import Destinations from "../components/Destinations";
import OfferSection from "../components/OfferSection";

const Homepage = () => {
  return (
    <div className="relative h-screen  bg-cover bg-center">
      <Navbar />
      <Banner />
      <OfferSection/>
      <MovingCarousel />
      <Destinations/>
    </div>
  );
};

export default Homepage;
