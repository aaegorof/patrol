import React, { useEffect } from "react";
import { animated, useTrail, config } from "react-spring";
import alert from "../../img/icon/attent.svg";
import rupor from "../../img/1step/rupor.svg";
import molniya from "../../img/1step/molniya.svg";
import molniya2 from "../../img/1step/molniya2.svg";
import send from "../../img/1step/send.svg";
import Rotating from "../Rotating";

const images = [send, alert, molniya2, molniya, rupor];
const imagesCoord = [[1, 1], [0.7, -170], [0.9, -120], [0.92, 170], [0.7, 80]];

const Step1 = props => {
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
      ? setImgTrail({ xy: [-550, 1], opacity: 1 })
      : setImgTrail({ xy: [1, 0], opacity: 0 });
  }, [inViewport]);

  return (
    <section
      name={`step-${step}`}
      className={`step-wrap relative step-${step}`}
      ref={forwardedRef}
    >
      {/*<div className="big-logo" style={{ opacity: inViewport ? 0 : 1 }}>*/}
      {/*  <Rotating double size={200}>*/}
      {/*    <img src={logo} />*/}
      {/*  </Rotating>*/}
      {/*</div>*/}
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

          <div
            className={`centered white-oval ${inViewport ? "growing" : ""}`}
          />

          <div
            className={`dynamic-text relative push-right ${
              inViewport ? "in-view" : ""
            }`}
          >
            <div className="step-title mg-2-b">
              <div className="step-num">0{step}</div>
              <span className="color-primary">Отправка</span>{" "}
              <span> обращения</span>
            </div>
            <div className="step-description">
              Потребитель, обнаруживший факт торговли контрафактными изделиями,
              создает  в мобильном приложении заявку  на рассмотрение. Для этого
              он совершает несколько простых шагов:
              <ul>
                <li>выбирает категорию из классификатора</li>
                <li>выбирает торговую точку на карте</li>
                <li>пишет комментарий</li>
                <li>фотографирует товар</li>
                <li>отправляет обращение</li>
              </ul>
            </div>
            <Rotating double size={500} inside />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Step1;
