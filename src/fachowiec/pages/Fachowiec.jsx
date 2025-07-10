import React from 'react'
import FachowiecIntro from './Mobile/FachowiecIntro/FachowiecIntro'
import { useIsMobile } from "../hooks/useIsMobile";
import FachowiecDektop from './Desktop/FachowiecDesktop/FachowiecDesktop'

export default function Fachowiec() {

  const isMobile = useIsMobile();

  return (
    <div>
      {isMobile ? <FachowiecIntro/> : <FachowiecDektop/>}
      
      
    </div>
  )
}
