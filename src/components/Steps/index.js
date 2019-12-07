import React, { useState, useCallback, lazy, Suspense } from "react";
import handleViewport from "react-in-viewport";
import "./style.scss";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import circleBg from "../../img/main/circle-bg.svg";


const Iphone  =lazy(() => import("./Iphone"));
const stepss = [Step1, Step2, Step3, Step4];

const stepViewportOpt = {
  rootMargin: `0% 0px -30% 0px`,
  threshold: 0.5
};

const Steps = props => {
  const [curStep, changeStep] = useState(0);

  const memoStepChange = useCallback(i => e => {
    changeStep(i+1);
  });
  const onLeave = i => {

  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>} >
        <Iphone step={curStep} />
      </Suspense>
      <img src={circleBg} className="circle-bg" />

      {stepss.map((Component, i) => {
        let StepBlock = handleViewport(
          props => (
            <Component
              step={i + 1}
              stepConfig={stepViewportOpt}
              inViewport={props.inViewport}
              forwardedRef={props.forwardedRef}
            />
          ),
          stepViewportOpt
        );

        return <StepBlock key={i + 1} onEnterViewport={memoStepChange(i)} onLeaveViewport={onLeave(i+1)}/>;
      })}
    </>
  );
};

export default Steps;
