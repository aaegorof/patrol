import React, { useEffect } from "react";
import { animated, useTrail, config } from "react-spring";
import Rotating from "../Rotating";

import logo from "../../img/logo.svg";
import molniya1 from "../../img/1step/molniya.svg";
import molniya3 from "../../img/3step/molniya3.svg";
import message from "../../img/2step/message.svg";
import done from "../../img/icon/done.svg";

const images = [message, done, logo];
const imagesCoord = [[0.8, -70], [1.2, 80], [0.9, 200]];

const Step4 = props => {
  const { inViewport, forwardedRef, stepConfig, step } = props;

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
      ? setImgTrail({ xy: [450, 1], opacity: 1 })
      : setImgTrail({ xy: [1, 0], opacity: 0 });
  }, [inViewport]);

  return (
    <section
      name={`step-${step}`}
      className={`step-wrap relative step-${step}`}
      ref={forwardedRef}
    >
      <div className="container">
        <div className="row">
          {imgTrail.map(({ xy, ...rest }, index) => (
            <animated.img
              key={images[index]}
              className={`trails-img fl-icon step4-icon i-${index}`}
              style={{ ...rest, transform: xy.interpolate(transform(index)) }}
              src={images[index]}
            />
          ))}

          <div
            className={`dynamic-text mg-auto ${inViewport ? "in-view" : ""}`}
          >
            <Rotating double inside size={300} />
            <div
              className={`centered white-oval big ${
                inViewport ? "growing" : ""
              }`}
            />
            <div className="step-title mg-2-b">
              <div className="step-num">0{step}</div>
              <span className="color-primary">Отслеживание</span>{" "}
              <span> результата</span>
            </div>
            <div className="step-description">
              <p>
                После отправки обращения пользователь  может отслеживать ход
                решения в мобильном приложении, а после получения ответа  –
                оценить работу и оставить отзыв.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Step4;
