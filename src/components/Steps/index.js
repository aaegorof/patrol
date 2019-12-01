import React from "react"
import {Parallax, ParallaxLayer} from 'react-spring/renderprops-addons'
import "./style.scss"
import Step1 from "./Step1"
import Step2 from "./Step2"
import phone from "../../img/phone/base1.svg"

const stepss = [Step1, Step2]


const Steps = () => {

  return <section className="steps-wrap full-height">
    <Parallax pages={3} >
      <ParallaxLayer offset={0} speed={-1} className="centered phone">
        <img src={phone} />
      </ParallaxLayer>
      <ParallaxLayer offset={1} speed={0.1} className="bg-green">
      </ParallaxLayer>
      <ParallaxLayer offset={2} speed={0.1} className="bg-grey">
      </ParallaxLayer>
    </Parallax>
    {/*{stepss.map(St => <section className="full-height">*/}
    {/*  <St />*/}
    {/*</section>)}*/}
  </section>
}

export default Steps