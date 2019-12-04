import React, { useEffect } from "react"
import phoneBg from "../../img/phone/base1.svg";
import screen0 from "../../img/phone/0step.png"
import screen1 from "../../img/phone/1step.png"
import screen2 from "../../img/phone/2step.png"
import screen3 from "../../img/phone/3step.png"
import screen4 from "../../img/phone/4step.png"


const screens = [screen0, screen1 ,screen2, screen3, screen4]



const Iphone = ({step}) => {

  return <div className="iphone" style={{backgroundImage: `url(${phoneBg})`}}>
      <img src={screens[step]} className="step-screen" />
  </div>
}

export default Iphone