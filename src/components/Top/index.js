import React, {lazy, Suspense} from "react";
import "./style.scss";
import "../../styles/animations.scss";
import logo from "../../img/logo.svg";
import megafon from "../../img/main/rupor.svg";
import lupa from "../../img/main/lupa.svg";
import { animated, useSpring } from "react-spring";
import Rotating from "../Rotating";
const Features = lazy(()=> import("./Features"));

const trans = num => (x, y) => {
  const xx = num < 30 ? num : -num;
  const yy = num < 30 ? num : -num;
  return `translate3d(${x / xx}px,${y / yy}px,0)`;
};

const Top = ({ forwardedRef }) => {
  const [parEl, setParEl] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 }
  }));

  return (
    <div
      id="top-face"
      className="top-wrap bg-mask bottom"
      onMouseMove={({ clientX: x, clientY: y }) =>
        setParEl({
          xy: [x - window.innerWidth / 2, y - window.innerHeight / 2]
        })
      }
      ref={forwardedRef}
    >
      <div className="container relative">
        <div className="centered column text-center col-lg-6 mg-auto">
          <img src={logo} className="mg-3-t" />
          <div className="title h3">Патруль качества</div>

          <h1>
            Борьба с <span className="color-primary">контрафактом</span> на
            табачном рынке
          </h1>
          <div className="site-description">
            Мы помогаем потребителям отстаивать свои права  на качественные
            товары с помощью мобильного приложения
          </div>
        </div>

        <Suspense fallback="Loading">
        <Features />
        </Suspense>

        <animated.div
          className="fl-icon"
          style={{
            transform: parEl.xy.interpolate(trans(Math.random() * 20 + 22)),
            left: 0,
            top: "22%"
          }} //min 22 and max is 42
        >
          <Rotating double size={180}>
            <img src={megafon} />
          </Rotating>
        </animated.div>

        <Rotating double size={120} style={{ right: 0, top: "32%" }}>
          <animated.img
            src={lupa}
            style={{
              transform: parEl.xy.interpolate(trans(Math.random() * 20 + 22))
            }}
          />
        </Rotating>
      </div>
    </div>
  );
};

export default Top;
