import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchApi } from "../../api";
import { bindActionCreators } from "redux";
import { sortTable, updateSortBy } from "../../actions";

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

const Issues = ({ pending, issues, fetchApi, sortTable, sortBy, updateSortBy }) => {
  useEffect(() => {
    fetchApi("issues");
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


  return (
    <div className="issues-wrap container">
      {pending}
      <table>
        <thead>
          <tr>
            <th onClick={toSort("region")}>Исполнитель</th>
            <th onClick={toSort("issue_total")}>Всего сообщений</th>
            <th onClick={toSort("overdue_total")}>Просроченные</th>
            <th onClick={toSort("happy_index")}>Индекс удовлетворенности</th>
          </tr>
        </thead>
        <tbody>
          {issues.map(issue => (
            <tr key={issue.region}>
              <td>{issue.region}</td>
              <td>{issue.issue_total}</td>
              <td>{issue.overdue_total}</td>
              <td className={coloredClass(issue.happy_index)}>
                {(+issue.happy_index).toFixed()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default connect(
  s2p,
  d2p
)(Issues);
