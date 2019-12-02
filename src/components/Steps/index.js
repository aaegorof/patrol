import React, {useState} from "react";
import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons";
import handleViewport from "react-in-viewport";
import "./style.scss";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Iphone from "./Iphone";

const stepss = [Step1, Step2];


const stepConfig = {
  offset: [-20, -20],
  threshhold: 0.5
};

const stepViewportOpt = {
  rootMargin: `${stepConfig.offset[0]}% 0px ${
      stepConfig.offset[1]
  }% 0px`,
  threshold: stepConfig.threshhold
}

const Steps = props => {
  const [curStep, changeStep] = useState(0)

  return (
    <section className="steps-wrap full-height">
      <Iphone step={curStep} />
      {/*<Parallax pages={3} >*/}
      {/*  <ParallaxLayer offset={0} speed={-1} className="centered phone">*/}
      {/*    <img src={phone} />*/}
      {/*  </ParallaxLayer>*/}
      {/*  <ParallaxLayer offset={1} speed={0.1} className="bg-green">*/}
      {/*  </ParallaxLayer>*/}
      {/*  <ParallaxLayer offset={2} speed={0.1} className="bg-grey">*/}
      {/*  </ParallaxLayer>*/}
      {/*</Parallax>*/}
      {stepss.map((Component, i) => {
        const StepBlock = handleViewport(
          props => <Component step={i} stepConfig={stepConfig} {...props} />,
          stepViewportOpt
        );

        return (
          <StepBlock
            key={i}
            onEnterViewport={() => changeStep(i)}
            onLeaveViewport={() => console.log("leave")}
          />
        );
      })}
    </section>
  );
};

export default Steps;
