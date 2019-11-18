import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as d3 from "d3";
import AnimatedPie from "./view";
import "./styles.scss";

const s2p = state => state;
const d2p = dispatch => ({});

const PieSection = () => {
  const generateData = (value, length = 5) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value:
        value === null || value === undefined ? Math.random() * 100 : value,
      text: "Heello"
    }));

  const [data, setData] = useState(generateData());
  const colors = ["#FFCB49", "#325699", "#75B644", "#FF6B6B"];

  return (
    <div className="pie-chart-wrap container text-center ">
        <AnimatedPie
          data={data}
          width={360}
          height={360}
          innerRadius={100}
          outerRadius={180}
          colors={colors}
          totalText="Всего обращений взято в работу"
        />
    </div>
  );
};

export default connect(
  s2p,
  d2p
)(PieSection);
