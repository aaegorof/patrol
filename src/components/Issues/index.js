import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchApi } from "../../api";
import { bindActionCreators } from "redux";
import { sortTable, updateSortBy } from "../../actions";

import "./styles.scss";
import Table from "./Table";

const s2p = state => state;
const d2p = dispatch =>
  bindActionCreators(
    {
      fetchApi: fetchApi
    },
    dispatch
  );

const Issues = ({
  pending,
  issues,
  fetchApi,
  errors
}) => {
  const [isFull, showFull] = useState(false);

  useEffect(() => {
    fetchApi("rating");
  }, []);

  const coloredClass = num => {
    if (+num > 30) {
      return "color-red";
    }
    if (+num < 20) {
      return "color-green";
    }
    else {
      return "color-secondary"
    }
  };

  const columnsHtml = {
    happy_index: {
      html : val => {
        return `${100 - +val.toFixed()}%`
      },
      className: val => coloredClass(100 - val)
    }
  }

  return (
    <div className="issues-wrap container">
      {pending}
      {errors.rating && (
        <div className="error text-center">{errors.rating}</div>
      )}

      {!errors.rating && !pending && (
          <Table listArray={issues} className={"rating"} id={"region"} columns={columnsHtml} labels={{region: "Исполнитель", issue_total: "Всего сообщений" , overdue_total: "Просроченные", happy_index: "% просрочки"  }}/> )}
        {/*<table className={`rating ${isFull ? "full" : ""}`}>*/}
        {/*  <thead>*/}
        {/*    <tr>*/}
        {/*      <th onClick={toSort("region")} className={sortClass("region")}>*/}
        {/*        Исполнитель*/}
        {/*      </th>*/}
        {/*      <th*/}
        {/*        onClick={toSort("issue_total")}*/}
        {/*        className={sortClass("issue_total")}*/}
        {/*      >*/}
        {/*        Всего сообщений*/}
        {/*      </th>*/}
        {/*      <th*/}
        {/*        onClick={toSort("overdue_total")}*/}
        {/*        className={sortClass("overdue_total")}*/}
        {/*      >*/}
        {/*        Просроченные*/}
        {/*      </th>*/}
        {/*      <th*/}
        {/*        onClick={toSort("happy_index")}*/}
        {/*        className={sortClass("happy_index")}*/}
        {/*      >*/}
        {/*        % просрочки*/}
        {/*      </th>*/}
        {/*    </tr>*/}
        {/*  </thead>*/}
        {/*  <tbody>*/}
        {/*    {issues.map(issue => (*/}
        {/*      <tr key={issue.region} className="issue-row">*/}
        {/*        <td>{issue.region}</td>*/}
        {/*        <td>{issue.issue_total}</td>*/}
        {/*        <td>{issue.overdue_total}</td>*/}
        {/*        <td className={coloredClass(100 - issue.happy_index)}>*/}
        {/*          {100 - (+issue.happy_index).toFixed()}%*/}
        {/*        </td>*/}
        {/*      </tr>*/}
        {/*    ))}*/}
        {/*  </tbody>*/}
        {/*</table>*/}


      {!errors.rating && (
        <div className="text-center mg-lg-3-t">
          <button className="button" onClick={() => showFull(!isFull)}>
            {isFull ? "Скрыть" : "Смотреть все – " + issues.length}
          </button>
        </div>
      )}
    </div>
  );
};

export default connect(
  s2p,
  d2p
)(Issues);
