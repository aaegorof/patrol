import React, { useEffect, useState } from "react";
import phoneBg from "../../img/phone/base1.png";
import screen0 from "../../img/phone/step0.png";
import screen1 from "../../img/phone/step1.png";
import screen2 from "../../img/phone/step2.png";
import screen3 from "../../img/phone/step3.png";
import screen4 from "../../img/phone/step4.png";

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

  return (
    <div
      className={`iphone i-step-${step}`}
      style={{
        backgroundImage: `url(${phoneBg})`,
        transform: `translate(-50%, 0%) rotate(${angle}deg)`
      }}
    >
      <img src={screens[step]} className={`step-screen`} />
    </div>
  );
};

export default Iphone;
