import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchApi } from "../../api";
import { bindActionCreators } from "redux";
import { sortTable, updateSortBy } from "../../actions";

import "./styles.scss"

const s2p = state => state;
const d2p = dispatch =>
  bindActionCreators(
    {
      fetchApi: fetchApi,
      updateSortBy: obj => dispatch =>  {
        dispatch(updateSortBy(obj))
      },
      sortTable: name => dispatch =>  {
        dispatch(sortTable(name))
      }
    },
    dispatch
  );

const Issues = ({ pending, issues, fetchApi, sortTable, sortBy, updateSortBy, errors }) => {
  const [isFull, showFull] = useState(false)
  useEffect(() => {
    fetchApi("rating");
  }, []);

  const coloredClass = num => {
    if (+num > 50) {
      return "color-green";
    }
    if (+num < 25) {
      return "color-red";
    }
  };

  const toSort = column => () => {
    const isDesc = column === sortBy.column ? !sortBy.isDesc : false
    const newSort = {
      column: column,
      isDesc: isDesc
    }
    updateSortBy(newSort)
    sortTable(newSort)
  }

  const sortClass = column => {
    return sortBy.column === column ?
        sortBy.isDesc ? "desc" : "asc"
        : ""
  }


  return (
    <div className="issues-wrap container">
      {pending}
      {errors.rating && <div className="error text-center">{errors.rating}</div> }
      {!errors.rating && <table className={`rating ${isFull ? "full" : ""}`}>
        <thead>
          <tr>
            <th onClick={toSort("region")} className={sortClass("region")}>Исполнитель</th>
            <th onClick={toSort("issue_total")} className={sortClass("issue_total")}>Всего сообщений</th>
            <th onClick={toSort("overdue_total")} className={sortClass("overdue_total")}>Просроченные</th>
            <th onClick={toSort("happy_index")} className={sortClass("happy_index")}>Индекс удовлетворенности</th>
          </tr>
        </thead>
        <tbody>
          {issues.map(issue => (
            <tr key={issue.region} className="issue-row">
              <td>{issue.region}</td>
              <td>{issue.issue_total}</td>
              <td>{issue.overdue_total}</td>
              <td className={coloredClass(issue.happy_index)}>
                {(+issue.happy_index).toFixed()}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>}

      {!errors.rating && <div className="text-center mg-lg-3-t">
        <button className="button" onClick={() => showFull(!isFull)}>
          {isFull ? "Скрыть" : "Смотреть все – " + issues.length}
        </button>
      </div>
      }
    </div>
  );
};

export default connect(
  s2p,
  d2p
)(Issues);
