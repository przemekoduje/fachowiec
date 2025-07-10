import React, { useState } from "react";
import "./heroSnapScroller.scss";
import HeroSlide from "../HeroSlide/HeroSlide"
import HeroTiles from "../HeroTiles/HeroTiles";


export default function HeroSnapScroller() {
  return (
    <div className="hero-snap-scroller">
      <section className="hero-viewport">
        <HeroSlide />
      </section>
      <section className="hero-viewport" id="hero-tiles">
        <HeroTiles />
      </section>
    </div>
  );
}
