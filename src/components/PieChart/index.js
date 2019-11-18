import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as d3 from "d3";
import AnimatedPie from "./view";
import "./styles.scss";
import { fetchApi } from "../../api";

const s2p = state => state;
const d2p = dispatch => ({
  fetchApi: val => {
    dispatch(fetchApi(val));
  }
});

let initStructure = {
  answered_in_time: {
    text: "Ответ в срок",
    value: 0,
    color: "#FFCB49"
  },
  answered_overdue: {
    text: "Ответ позже срока",
    value: 0,
    color: "#325699"
  },
  not_answered_overdue: {
    text: "Просрочено",
    value: 0,
    color: "#75B644"
  },
  not_answered_in_time: {
    text: "Не просрочено",
    value: 0,
    color: "#FF6B6B"
  }
};


const PieSection = props => {

  const prepareData = () => {
    for (const key in props.counter) {
      if(Object.keys(initStructure).includes(key)) {
        initStructure[key].value = props.counter[key]
      }
    }
    const yy = Object.values(initStructure).map((it, id) => ({
      ...it,
          date: id}))
    return yy;
  };
  useEffect(() => {
    props.fetchApi("counter");
  }, []);

  const colors = prepareData().map(i => i.color);

  return (
    <div className="pie-chart-wrap container text-center ">
      {!props.errors.counter && <AnimatedPie
        data={prepareData()}
        width={360}
        height={360}
        innerRadius={100}
        outerRadius={180}
        colors={colors}
        totalText="Всего обращений взято в работу"
      />}
      {props.errors.counter && <div className="error">
        {props.errors.counter}
      </div> }
    </div>
  );
};

export default connect(
  s2p,
  d2p
)(PieSection);
