import React, { useEffect, useRef } from "react";
import { animated, useSpring } from "react-spring";
import * as d3 from "d3";
import shadowImg from "../../img/oval-shadow.svg"

const colors = d3.scaleOrdinal(d3.schemeCategory10);

const format = d3.format("0");
const animationDuration = 250;

const animationConfig = {
  to: async (next, cancel) => {
    await next({ t: 1 });
  },
  from: { t: 0 },
  config: { duration: animationDuration },
  reset: true
};

const Arc = ({
  index,
  from,
  to,
  createArc,
  color,
  format,
  animatedProps,
  offset,
  text
}) => {
  const interpolator = d3.interpolate(from, to);
  return (
    <g key={index} className="arc">
      <animated.path
        className="arc"
        d={animatedProps.t.interpolate(t => createArc(interpolator(t)))}
        fill={color}
      />
      <animated.text
        transform={animatedProps.t.interpolate(t => {
          const [xx, yy] = createArc.centroid(interpolator(t));
          const x = xx > 0 ? xx + offset : xx - offset;
          const y = yy > 0 ? yy + offset : yy - offset;
          return `translate(${x}, ${y})`;
        })}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill={color}
        fontSize="26"
      >
        {animatedProps.t.interpolate(t => format(interpolator(t).value))}
      </animated.text>
      <animated.text
        transform={animatedProps.t.interpolate(t => {
          const [xx, yy] = createArc.centroid(interpolator(t));
          const x = xx > 0 ? xx + offset : xx - offset;
          const y = yy > 0 ? yy + offset : yy - offset;
          return `translate(${x}, ${y})`;
        })}
        textAnchor="middle"
        alignmentBaseline="middle"
        y="26"
        fill="#9C9DA0"
        className="text"
      >
        {text}
      </animated.text>
    </g>
  );
};

const Pie = props => {
  const cache = useRef([]);
  const createPie = d3
    .pie()
    .value(d => d.value)
    .sort(null);
  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius);
  const data = createPie(props.data);
  const previousData = createPie(cache.current);

  const [animatedProps, setAnimatedProps] = useSpring(() => animationConfig);
  setAnimatedProps(animationConfig);

  useEffect(() => {
    cache.current = props.data;
  });
  const maxCountWidth = props.innerRadius * 2 * 0.7;

  const totalNumber = () => {
    let total = 0

    for (let i = 0; i < props.data.length; ++i ) {
      total += props.data[i].value
    }
    return total.toFixed()
  }

  return (
    <div className="pie-chart">
      <svg width={props.width} height={props.height} className="pie-svg">
        <g transform={`translate(${props.outerRadius} ${props.outerRadius})`}>
          {data.map((d, i) => (
            <Arc
              key={i}
              index={i}
              from={previousData[i]}
              to={d}
              createArc={createArc}
              color={props.colors ? props.colors[i] : colors(i)}
              text={props.data[i].text}
              format={format}
              animatedProps={animatedProps}
              offset={props.width / 5}
            />
          ))}
        </g>
      </svg>
      <div className="total-count" style={{ maxWidth: maxCountWidth }}>
        <div>{totalNumber()}</div>
        {props.totalText && <div className="total-text">{props.totalText}</div>}
      </div>
      <img src={shadowImg} className="shadow-img"/>
    </div>
  );
};

export default Pie;
