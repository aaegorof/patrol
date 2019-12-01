import React from "react";
import "./style.scss";
import mask from "../../img/main/main-mask.svg";
import logo from "../../img/logo.svg";
import megafon from "../../img/icon/megafon-right.svg";
import lupa from "../../img/main/lupa.svg";
import { animated, useSpring } from "react-spring";

const parallaxElAnimConfig = {
  xy: [0, 0],
  config: { mass: 10, tension: 550, friction: 140 }
};
const trans = num => (x, y) => {
  const xx = num < 30 ? num : -num
  const yy = num < 30 ? num : -num
 return `translate3d(${x / xx}px,${y / yy}px,0)`;
}
const trans2 = num => (x, y) => `translate3d(${x / num}px,${y / num}px,0)`;

const Top = () => {
  const [parEl, setParEl] = useSpring(() => parallaxElAnimConfig);

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
      <animated.img
        src={megafon}
        className="fl-icon icon-left-2"
        style={{ transform: parEl.xy.interpolate(trans( Math.random() * 20 + 22)) }} //min 22 and max is 42
      />
      <animated.img
          src={lupa}
          className="fl-icon icon-right-2"
          style={{ transform: parEl.xy.interpolate(trans( Math.random() * 20 + 22)) }}
      />
    </div>
  );
};

export default Top;
