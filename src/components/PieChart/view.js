import React, { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import * as d3 from "d3";
import shadowImg from "../../img/oval-shadow.svg";

const calcOffset = (
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  modifier
) => {
  const mod = modifier ? modifier : 2;
  let r = (+innerRadius + +outerRadius) / mod,
    a = (+startAngle + +endAngle) / 2 - Math.PI / 2;
  return [Math.cos(a) * r, Math.sin(a) * r];
};

const colors = d3.scaleOrdinal(d3.schemeCategory10);

const format = d3.format("0");

const pieAnimationConfig = {
  to: async (next, cancel) => {
    await next({ t: 1 });
  },
  from: { t: 0 },
  config: { duration: 1450 }
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
          const [x, y] = offset;
          return `translate(${x}, ${y})`;
        })}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill={color}
        fontSize="26"
      >
        {animatedProps.t.interpolate(t =>
          format(interpolator(t).value.toFixed())
        )}
      </animated.text>
      <animated.text
        transform={animatedProps.t.interpolate(t => {
          //const [xx, yy] = createArc.centroid(interpolator(t));
          const [x, y] = offset;
          return `translate(${x}, ${y})`;
        })}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="#9C9DA0"
        className="text"
        y={10}
      >
        {text.map(word => (
          <tspan x={0} dy={12}>
            {word}
          </tspan>
        ))}
      </animated.text>
    </g>
  );
};

const Pie = props => {
  const cache = useRef([]);
  const [svgKey, setSvgKey] = useState(Math.random());
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

  const [animatedProps, setAnimatedProps] = useSpring(() => pieAnimationConfig);

  setAnimatedProps(pieAnimationConfig);

  useEffect(() => {
    cache.current = props.data;
  });

  useEffect(() => {
    setSvgKey(Math.random());
  }, [props.inViewport]);

  const maxCountWidth = props.innerRadius * 2 * 0.7;

  const for20 = () => {
    const [x, y] = calcOffset(
      props.outerRadius,
      props.innerRadius,
      0,
      1.256,
      0.7
    );
    return `translate(${x},${y})`;
  };
  const for80 = () => {
    const [x, y] = calcOffset(
      props.outerRadius,
      props.innerRadius,
      1.256,
      6.28,
      0.65
    );
    return `translate(${x},${y})`;
  };

  return (
    <div className="pie-chart">
      <svg width={props.width} height={props.height} className="pie-svg">
        <g transform={`translate(${props.outerRadius} ${props.outerRadius})`}>
          {data.map((d, i) => {
            return (
              <Arc
                key={i}
                index={i}
                from={previousData[i]}
                to={d}
                createArc={createArc}
                color={d.data.color ? d.data.color : colors(i)}
                text={d.data.text}
                format={format}
                animatedProps={animatedProps}
                offset={calcOffset(
                  props.outerRadius,
                  props.innerRadius,
                  d.startAngle,
                  d.endAngle,
                  1.15
                )}
              />
            );
          })}
        </g>
        <g transform={`translate(${props.outerRadius} ${props.outerRadius})`}>
          <text
            className="group-num"
            transform={for20()}
            alignmentBaseline="middle"
          >
            <tspan x={0}>
              {((props.groupAnswered * 100) / props.total).toFixed()}%
            </tspan>
            <tspan x={0} dy={26}>
              проблем
            </tspan>
            <tspan x={0} dy={18}>
              были решены
            </tspan>
          </text>
          <text
            transform={for80()}
            alignmentBaseline="middle"
            className="group-num"
          >
            <tspan x={0}>
              {((props.groupNotAnswered * 100) / props.total).toFixed()}%
            </tspan>
            <tspan x={0} dy={26}>
              проблем пока
            </tspan>
            <tspan x={0} dy={18}>
              не решены
            </tspan>
          </text>
        </g>
      </svg>

      <div className="total-count" style={{ maxWidth: maxCountWidth }}>
        <div>{props.total}</div>
        {props.totalText && <div className="total-text">{props.totalText}</div>}
      </div>
      <img src={shadowImg} className="shadow-img" />
    </div>
  );
};

export default Pie;
