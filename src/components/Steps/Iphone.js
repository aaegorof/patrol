import React, { useEffect, useState } from "react";
import phoneBg from "../../img/phone/base1.png";
import screen0 from "../../img/phone/0step.png";
import screen1 from "../../img/phone/1step.png";
import screen2 from "../../img/phone/2step.png";
import screen3 from "../../img/phone/3step.png";
import screen4 from "../../img/phone/4step.png";
import { Link } from "react-scroll";

const screens = [screen0, screen1, screen2, screen3, screen4];

const Iphone = ({ step }) => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const mod = step % 2 ? 1 : -1;
    if (step === 0 || step === 4) {
      setAngle(0);
    } else {
      setAngle((Math.random() * 4 + 2) * mod);
    }
  }, [step]);

  const prevDirection = () => (step === 1 ? "top-face" : `step-${step - 1}`);
  const nextDirection = () =>
    step === screens.length - 1 ? "map" : `step-${step + 1}`;

  return (
    <div
      className={`iphone i-step-${step}`}
      style={{
        backgroundImage: `url(${phoneBg})`,
        transform: `translate(-50%,-20%) rotate(${angle}deg)`
      }}
    >
      <Link
        className="step-link prev"
        to={prevDirection()}
        smooth={true}
        duration={500}
        key={`prev-${step - 1}`}
        offset={-60}
      />
      <img src={screens[step]} className={`step-screen`} />
      <Link
        className="step-link next"
        to={nextDirection()}
        smooth={true}
        duration={500}
        key={`next-${step + 1}`}
        offset={-60}
      />
    </div>
  );
};

export default Iphone;
