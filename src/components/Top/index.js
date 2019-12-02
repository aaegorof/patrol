import React from "react";
import "./style.scss";
import "../../styles/animations.scss";
import mask from "../../img/main/main-mask.svg";
import logo from "../../img/logo.svg";
import megafon from "../../img/main/rupor.svg";
import lupa from "../../img/main/lupa.svg";
import { animated, useSpring } from "react-spring";

const trans = num => (x, y) => {
  const xx = num < 30 ? num : -num;
  const yy = num < 30 ? num : -num;
  return `translate3d(${x / xx}px,${y / yy}px,0)`;
};

const Top = () => {
  const [parEl, setParEl] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 }
  }));

  return (
    <div
      className="top-wrap bg-white bg-mask bottom"
      style={{ backgroundImage: `url(${mask})` }}
      onMouseMove={({ clientX: x, clientY: y }) =>
        setParEl({
          xy: [x - window.innerWidth / 2, y - window.innerHeight / 2]
        })
      }
    >

      <div className="container relative">

        <animated.div
            className="fl-icon double-rotating"
            style={{
              transform: parEl.xy.interpolate(trans(Math.random() * 20 + 22)),
              left: 0,
              top: "22%"
            }} //min 22 and max is 42
        >
          <img src={megafon} />
        </animated.div>

        <div className="double-rotating fl-icon" style={{ right: 0, top: "32%" }}>
          <animated.img
              src={lupa}
              style={{
                transform: parEl.xy.interpolate(trans(Math.random() * 20 + 22))
              }}
          />
        </div>
      </div>

    </div>
  );
};

export default Top;
