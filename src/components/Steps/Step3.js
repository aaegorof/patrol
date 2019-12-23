import React, { useEffect } from "react";
import { animated, useTrail, config } from "react-spring";
import eye from "../../img/3step/eye3.svg";
import mail from "../../img/3step/mail3.svg";
import molniya3 from "../../img/3step/molniya3.svg";
import message from "../../img/3step/message3.svg";
import Rotating from "../Rotating";
import { description } from "d3/dist/package";

const images = [message, mail, molniya3, eye];
const imagesCoord = [[1, 1], [1.1, -20], [0.65, -90], [0.6, 220]];

const Step3 = props => {
  const { inViewport, forwardedRef, step, titleArr, description  } = props;

  const [imgTrail, setImgTrail] = useTrail(images.length, () => ({
    from: { opacity: 0, xy: [1, 1] },
    config: config.stiff
  }));

  const transform = index => (x, y) => {
    const [xx, yy] = imagesCoord[index];
    return `translate3d(${x * xx}px, ${1 + y * yy}px, 0)`;
  };

  useEffect(() => {
    inViewport
      ? setImgTrail({ xy: [-550, 1], opacity: 1 })
      : setImgTrail({ xy: [1, 0], opacity: 0 });
  }, [inViewport,setImgTrail]);

  return (
    <section
      name={`step${step}`}
      className={`step-wrap relative step-${step}`}
      ref={forwardedRef}
    >
      <div className="container">
        <div className="row">
          <div className="3step-img-wrapper col-lg-3">
            {inViewport && <Rotating double size={360} />}
            {imgTrail.map(({ xy, ...rest }, index) => (
              <animated.img
                key={images[index]}
                className="trails-img fl-icon step3-icon"
                style={{ ...rest, transform: xy.interpolate(transform(index)) }}
                src={images[index]}
              />
            ))}
          </div>

          <div
            className={`centered white-oval ${inViewport ? "growing" : ""}`}
          />

          <div
            className={`dynamic-text push-right ${inViewport ? "in-view" : ""}`}
          >
            <div className="step-title mg-2-b">
              <div className="step-num">0{step}</div>
              <span className="color-primary">{titleArr[0]}</span>
              <span> {titleArr.slice(1,titleArr.length)}</span>
            </div>
            <div className="step-description" dangerouslySetInnerHTML={{__html: description}}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Step3;
