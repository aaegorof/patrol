import React, {useEffect} from "react";
import { useSpring, animated } from "react-spring";
import alert from "../../img/icon/attent.svg";

const Step1 = props => {
  const { inViewport, forwardedRef, stepConfig, step } = props;

  const [spring, setSpring] = useSpring(() => ({
    from : {
      xy: [-20, -20]
    }
  }));

  const transform = (x,y) => {
    return `translate3d(${x}px,${y}px,0)`;
  }

  useEffect(() =>{
    inViewport ?
        setSpring({xy: [200,200]}) :
        setSpring({xy: [0,0]})
  },[inViewport])


  return (
      <section className="step-wrap relative" ref={forwardedRef}>
        {/*<div style={{height: (100 - stepConfig.offset*2 + "%") , position: "absolute", top: stepConfig.offset + "%", background: "rgba(0,0,0,0.2)", width: "100%"}}></div>*/}
        <div className="container">
          {`Welcome to ${step}`}
          <animated.img
              src={alert}
              className="fl-icon icon-center step1-icon"
              style={{ transform: spring.xy.interpolate(transform)}}
          />
        </div>
      </section>
  );
};

export default Step1;
