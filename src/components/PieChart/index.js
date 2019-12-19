import React, { useEffect } from "react";
import { connect } from "react-redux";
import AnimatedPie from "./view";
import { fetchApi } from "../../api";

import "./styles.scss";
import { useSpring, animated } from "react-spring";

import iconMegafon from "../../img/icon/megafon-left.svg";
import iconAttent from "../../img/icon/attent.svg";
import iconDone from "../../img/icon/done.svg";
import iconLoading from "../../img/icon/loading.svg";
import iconMail from "../../img/icon/mail.svg";
import { useInView } from "react-intersection-observer";

const s2p = ({counter,errors}) => ({counter, errors});
const d2p = dispatch => ({
  fetchApi: val => {
    dispatch(fetchApi(val));
  }
});

let initStructure = {
  answered_in_time: {
    text: ["окончательный ответ", "получен в срок", "до 30 дней"],
    value: 0,
    color: "#FFCB49"
  },
  answered_overdue: {
    text: ["окончательный ответ", "был получен в срок", "более 30 дней"],
    value: 0,
    color: "#325699"
  },
  not_answered_overdue: {
    text: ["ожидают окончательный", "ответ исполнителя", "более 30 дней"],
    value: 0,
    color: "#75B644"
  },
  not_answered_in_time: {
    text: ["ожидают окончательный", "ответ исполнителя", "менее 30 дней"],
    value: 0,
    color: "#FF6B6B"
  }
};

const parallaxElAnimConfig = {
  xy: [0, 0],
  yz: [0, 360],
  config: { mass: 10, tension: 550, friction: 140 }
};

const PieChart = props => {
  const prepareData = () => {
    for (const key in props.counter) {
      if (Object.keys(initStructure).includes(key)) {
        initStructure[key].value = props.counter[key];
      }
    }
    const yy = Object.values(initStructure).map((it, id) => ({
      ...it,
      date: id
    }));

    let groupAnswered =
      initStructure.answered_in_time.value +
      initStructure.answered_overdue.value;
    let groupNotAnswered =
      initStructure.not_answered_overdue.value +
      initStructure.not_answered_in_time.value;
    return [yy, groupAnswered, groupNotAnswered];
  };
  const [ref, inView] = useInView({threshold: 0.5})
  const [preparedData, groupAnswered, groupNotAnswered] = prepareData();

  useEffect(() => {
    props.fetchApi("counter");
  }, []);

  const colors = prepareData().map(i => i.color);

  const [parEl, setParEl] = useSpring(() => parallaxElAnimConfig);
  const calc = (x, y) => [
    x - window.innerWidth / 2,
    y - window.innerHeight / 2
  ];

  const trans1 = (x, y) => `translate3d(${-x / 8}px,${y / 12}px,0)`;
  const trans2 = (x, y) => `translate3d(${x / 16}px,${y / 22}px,0)`;
  const trans3 = (x, y) => `translate3d(${x / 12}px,${y / 12}px,0)`;
  const trans4 = (x, y) => `translate3d(${-x / 12}px,${-y / 16}px,0)`;

  const pieW = window.innerWidth < 425 ? 200 : 360

  return (
    <div
      className="pie-chart-wrap container text-center relative"
      onMouseMove={({ clientX: x, clientY: y }) => setParEl({ xy: calc(x, y) })}
      ref={ref}
    >
      {!props.errors.counter &&  (
        <AnimatedPie
          data={preparedData}
          width={pieW}
          height={pieW}
          innerRadius={window.innerWidth < 425 ? pieW/3 : pieW/4 }
          outerRadius={pieW/2}
          colors={colors}
          total={props.counter.in_work}
          totalText="Всего обращений взято в работу"
          groupAnswered={groupAnswered}
          groupNotAnswered={groupNotAnswered}
          inViewport={inView}
        />
      )}
      {props.errors.counter && (
        <div className="error">{props.errors.counter}</div>
      )}

      <animated.img
        src={iconAttent}
        className="fl-icon icon-left-1"
        style={{ transform: parEl.xy.interpolate(trans1) }}
      />
      <animated.img
        src={iconMail}
        className="fl-icon icon-left-2"
        style={{ transform: parEl.xy.interpolate(trans2) }}
      />
      <animated.img
        src={iconLoading}
        className="fl-icon icon-left-3"
        style={{ transform: parEl.xy.interpolate(trans3) }}
      />
      <animated.img
        src={iconMegafon}
        className="fl-icon icon-right-1"
        style={{ transform: parEl.xy.interpolate(trans1) }}
      />
      <animated.img
        src={iconDone}
        className="fl-icon icon-right-2"
        style={{ transform: parEl.xy.interpolate(trans4) }}
      />
    </div>
  );
};

export default connect(
  s2p,
  d2p
)(PieChart);
