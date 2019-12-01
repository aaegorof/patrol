import React, { useEffect } from "react"
import { connect } from 'react-redux'
import phoneBg from "../../img/phone/base1.svg";
import screen1 from "../../img/phone/screen1.png"

const screens = [screen1]

const s2p = ({steps}) => ({
  steps: steps
});
const d2p = dispatch => ({})

const Iphone = ({steps}) => {

  return <div className="iphone" style={{backgroundImage: `url(${phoneBg})`}}>
    {steps.currentStep}
      <img src={screens[steps.currentStep]} />
  </div>
}

export default connect(
    s2p,
    d2p
)(Iphone)