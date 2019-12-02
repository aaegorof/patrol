import React, { useEffect } from "react"
import phoneBg from "../../img/phone/base1.svg";
import screen1 from "../../img/phone/screen1.png"

const screens = [screen1]



const Iphone = ({step}) => {

  return <div className="iphone" style={{backgroundImage: `url(${phoneBg})`}}>
    <div className="text">{step}</div>
      <img src={screens[step]} />
  </div>
}

export default Iphone