import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { fetchApi } from "../../api";
import { ReactComponent as West } from "./west.svg";
import { ReactComponent as East } from "./east.svg";

import "./style.scss";
import molniya from "../../img/icon/smallmolniya.svg";
import Collapser from "../Collapser";
import Search from "./Search";

const s2p = ({ map, issues }) => ({
  map: map,
  issues: issues
});
const d2p = dispatch => ({
  fetchApi: val => {
    dispatch(fetchApi(val));
  }
});

const CountryPath = ({
  country,
  active,
  click,
  mostIssuesIds,
  countryPosition
}) => {
  const id = +country.props.id;
  const isActive = id === active;
  const isLake = /region_/.test(country.props.id);
  const popularClass = mostIssuesIds.includes(id) ? "popular" : "";
  const regionClasses =
    country.props.className +
    " " +
    (isActive && !isLake ? "active" : "") +
    " " +
    popularClass;

  let position = null;
  const pos = el => {
    if (el) {
      position = el.getBoundingClientRect();
    }
  };
  useEffect(() => {
    if (isActive) {
      countryPosition(position);
    }
  }, [active]);

  const onClick = id => () => {
    if (isLake) {
      return;
    }
    countryPosition(position);
    click(id);
  };

  return (
    <g ref={pos} key={country.region_num}>
      {React.cloneElement(country, {
        className: regionClasses,
        onClick: onClick(id)
      })}
    </g>
  );
};

const Map = ({ map, fetchApi, firstTop, issues }) => {
  const [activeId, changeActive] = useState(null);
  const [countryPos, changeTooltipPos] = useState(null);
  const [activeMap, setActiveMap] = useState(null);
  const mapPosition = useRef(null);

  useEffect(() => {
    fetchApi("map");
  }, [fetchApi]);

  const mostIssues = map
    .sort((a, b) => {
      return +b.issue_total - +a.issue_total;
    })
    .slice(0, firstTop);
  const mostIllegal = issues
    .sort((a, b) => {
      return +a.happy_index - +b.happy_index;
    })
    .slice(0, firstTop);

  const mostIssuesIds = mostIssues.map(iss => iss.region_num);

  const active = map.filter(ctry => ctry.region_num === activeId)[0];

  const tooltipTop = () => {
    return countryPos !== null
      ? countryPos.top - mapPosition.current.getBoundingClientRect().top
      : null;
  };

  const tooltipLeft = () =>
    countryPos !== null
      ? countryPos.left - mapPosition.current.getBoundingClientRect().left
      : null;

  const cleanActiveCountries = () =>
    document
      .querySelectorAll(".split-map path, .split-map polygon")
      .forEach(path => (path.classList = []));

  const countryClick = mapSide => e => {
    cleanActiveCountries();
    e.target.classList = "active";
    changeActive(+e.target.id);
    changeTooltipPos(e.target.getBoundingClientRect());
    setActiveMap(mapSide);
  };
  const countrySideClick = id => {
    const el = document.getElementById(id);
    setActiveMap(null);
    cleanActiveCountries();
    el.classList = "active";
    changeActive(id);
    changeTooltipPos(el.getBoundingClientRect());
  };

  return (
    <div className="map-wrap container">
      <div className="row">
        <div className="col-lg-9 relative">

          <Search issues={issues} activeId={activeId} activeMap={activeMap} onSearch={id => countrySideClick(id)}/>

          {activeMap && (
            <div
              className="color-primary back-to-map"
              onClick={() => {
                cleanActiveCountries();
                changeActive(null);
                setActiveMap(null);
              }}
            >
              {`< Назад к общей карте`}
            </div>
          )}
          <svg
            className={`split-map ${!activeMap && "general"}`}
            width="1045"
            height="587"
            viewBox="0 0 1045 587"
            ref={mapPosition}
          >
            {activeMap !== "east" && <West onClick={countryClick("west")} />}
            {activeMap !== "west" && <East onClick={countryClick("east")} />}
          </svg>

          {countryPos && active && (
            <div
              className="map-tooltip text-center"
              style={{ top: tooltipTop(), left: tooltipLeft() }}
            >
              <div>{active.region}</div>
              <div>Обращений: {active.issue_total}</div>
            </div>
          )}
        </div>

        <div className="col-lg-3">
          <Collapser opened>
            <h3>Регионы с наибольшим количеством обращений</h3>
            <ul className="no-list">
              {mostIssues.map(issue => (
                <li
                  onClick={() => countrySideClick(issue.region_num)}
                  className={issue.region_num === activeId ? "active" : ""}
                  key={issue.region_num}
                >
                  <img src={molniya} className="molniya" />
                  {issue.region}
                </li>
              ))}
            </ul>
          </Collapser>
          <Collapser>
            <h3>Регионы с наименьшим откликом исполнителя</h3>
            <ul className={"no-list"}>
              {mostIllegal.map(issue => (
                <li
                  //onClick={() => countrySideClick(region_num)}
                  className={issue.region_num === activeId ? "active" : ""}
                  key={issue.region_num}
                >
                  {issue.region}
                </li>
              ))}
            </ul>
          </Collapser>
        </div>
      </div>
    </div>
  );
};

export default connect(
  s2p,
  d2p
)(Map);
