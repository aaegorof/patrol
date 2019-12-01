import React from "react";
import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons";
import handleViewport from "react-in-viewport";
import "./style.scss";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Iphone from "./Iphone";
import { connect } from "react-redux";
import { changeCurrentStep } from "../../actions";

const stepss = [Step1, Step2];

const s2p = ({ steps }) => ({
  steps: steps
});
const d2p = dispatch => ({
  changeCurrentStep: stepNum => dispatch(changeCurrentStep(stepNum))
});

const stepConfig = {
  offset: [-20, -20],
  threshhold: 0.5
};

const Steps = props => {
  const { changeCurrentStep } = props;
  return (
    <section className="steps-wrap full-height">
      <Iphone step={props.steps.currentStep} />
      {/*<Parallax pages={3} >*/}
      {/*  <ParallaxLayer offset={0} speed={-1} className="centered phone">*/}
      {/*    <img src={phone} />*/}
      {/*  </ParallaxLayer>*/}
      {/*  <ParallaxLayer offset={1} speed={0.1} className="bg-green">*/}
      {/*  </ParallaxLayer>*/}
      {/*  <ParallaxLayer offset={2} speed={0.1} className="bg-grey">*/}
      {/*  </ParallaxLayer>*/}
      {/*</Parallax>*/}
      {stepss.map((St, i) => {
        const StepBlock = handleViewport(
          props => <St step={i} stepConfig={stepConfig} {...props} />,
          {
            rootMargin: `${stepConfig.offset[0]}% 0px ${
              stepConfig.offset[1]
            }% 0px`,
            threshold: stepConfig.threshhold
          }
        );

        return (
          <StepBlock
            key={i}
            onEnterViewport={() => changeCurrentStep(i)}
            onLeaveViewport={() => console.log("leave")}
          />
        );
      })}
    </section>
  );
};

export default connect(
  s2p,
  d2p
)(Steps);
