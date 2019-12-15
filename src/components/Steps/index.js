import React, { useState } from "react";
import "./style.scss";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Top from "../Top";
import { InView } from "react-intersection-observer";
import Iphone from "./Iphone";
const stepss = [Step1, Step2, Step3, Step4];

const stepViewportOpt = {
  rootMargin: `-60px 0px 0% 0px`,
  threshold: 0.52
};

const Steps = () => {
  const [curStep, changeStep] = useState(0);
  const memoStepChange = i => () => {
    changeStep(i + 1);
  };

  const toStep0 = () => {
    changeStep(0);
  };

  return (
    <>
      <InView onChange={toStep0} rootMargin={`-25% 0px -25% 0px`} threshold={0}>
        {({ inView, ref }) => (
          <div ref={ref}>
            <Top inViewport={inView} />
          </div>
        )}
      </InView>

      <Iphone step={curStep} />

      {stepss.map((Component, i) => {
        return (
          <InView onChange={memoStepChange(i)} {...stepViewportOpt}>
            {({ inView, ref }) => (
              <div ref={ref}>
                <Component step={i + 1} inViewport={inView} key={i + 1} />
              </div>
            )}
          </InView>
        );
      })}
    </>
  );
};

export default Steps;
