import React from 'react'
import HeroDesktop from "../HeroDesktop/HeroDesktop"
import ServiceDesktop from "../ServiceDesktop/ServiceDesktop"
import AboutDesktop from "../AboutDesktop/AboutDesktop"
import HowItWorksDesktop from "../ProcessDesktop/ProcessDesktop";
import ReviewsDesktop from '../ReviewsDesktop/ReviewsDesktop';
import DIY from '../DiyDesktop/DiyDesktop';

export default function FachowiecDesktop() {
  return (
    <div>
      <HeroDesktop/>
      <ServiceDesktop/>
      <AboutDesktop/>
      <HowItWorksDesktop />
      <ReviewsDesktop/>
      <DIY/>
    </div>
  )
}
