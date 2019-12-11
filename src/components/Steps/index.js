import React, { useState, useCallback, lazy, Suspense } from "react";
import handleViewport from "react-in-viewport";
import "./style.scss";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import circleBg from "../../img/main/circle-bg.svg";
import Top from "../Top";

const Iphone = lazy(() => import("./Iphone"));
const stepss = [Step1, Step2, Step3, Step4];

const stepViewportOpt = {
  rootMargin: `0% 0px -30% 0px`,
  threshold: 0.6
};

const Steps = () => {
  const [curStep, changeStep] = useState(0);
  const memoStepChange = useCallback(i => e => {
    changeStep(i + 1);
  });
  const TopWrap = handleViewport(
    props => (
      <Top inViewport={props.inViewport} forwardedRef={props.forwardedRef} />
    ),
    { rootMargin: `-15% 0px -75% 0px`, threshold: 0 }
  );
  const toStep0 = () => {
    changeStep(0);
  };

  return (
    <>
      <TopWrap onEnterViewport={toStep0} />
      <Suspense fallback={<div>Loading...</div>}>
        <Iphone step={curStep} />
      </Suspense>
      <img src={circleBg} className="circle-bg" />

      {stepss.map((Component, i) => {
        const StepBlock = handleViewport(
          props => (
            <Component
              step={i + 1}
              stepConfig={stepViewportOpt}
              inViewport={props.inViewport}
              forwardedRef={props.forwardedRef}
              key={i + 1}
            />
          ),
          stepViewportOpt
        );

        return <StepBlock key={i + 1} onEnterViewport={memoStepChange(i)} />;
      })}
    </>
  );
};

export default Steps;
