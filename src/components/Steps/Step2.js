import React, { useEffect } from "react";
import { animated, useTrail } from "react-spring";
import loading from "../../img/2step/loading.svg";
import message from "../../img/2step/message.svg";
import search from "../../img/2step/search.svg";
import molniya from "../../img/1step/molniya.svg";
import Rotating from "../Rotating";

const images = [loading, message, search, molniya];
const imagesCoord = [[0.8, 170], [1, 1], [1.45, 1], [1, -70]];

const Step1 = props => {
  const { inViewport, forwardedRef, step, titleArr, description } = props;

  const [imgTrail, setImgTrail] = useTrail(images.length, () => ({
    from: { opacity: 0, xy: [1, 1] }
  }));

  const transform = index => (x, y) => {
    const [xx, yy] = imagesCoord[index];
    return `translate3d(${x * xx}px, ${1 + y * yy}px, 0)`;
  };
  useEffect(() => {
    inViewport
      ? setImgTrail({ xy: [380, 1], opacity: 1 })
      : setImgTrail({ xy: [1, 0], opacity: 0 });
  }, [inViewport, setImgTrail]);

  return (
    <section
      name={`step${step}`}
      className={`step-wrap relative step-${step}`}
      ref={forwardedRef}
    >
      <div className="container">
        <div className="row">
          {imgTrail.map(({ xy, ...rest }, index) => (
            <animated.img
              key={images[index]}
              className="trails-img fl-icon step1-icon"
              style={{ ...rest, transform: xy.interpolate(transform(index)) }}
              src={images[index]}
            />
          ))}
          <div className={`centered white-oval ${inViewport ? "growing" : ""}`}>
            <Rotating double size="100%" />
          </div>

          <div className={`dynamic-text ${inViewport ? "in-view" : ""}`}>
            <div className="step-title mg-2-b">
              <div className="step-num">0{step}</div>
              <div className="color-primary">{titleArr[0]}</div><div> {titleArr.slice(1,titleArr.length)}</div>
            </div>
            <div className="step-description" dangerouslySetInnerHTML={{__html: description}}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Step1;
