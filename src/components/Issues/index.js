import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchApi } from "../../api";
import { bindActionCreators } from "redux";

import "./styles.scss";
import Table from "../Table";

const s2p = state => state;
const d2p = dispatch =>
  bindActionCreators(
    {
      fetchApi: fetchApi
    },
    dispatch
  );

const Issues = ({ pending, issues, fetchApi, errors }) => {
  useEffect(() => {
    fetchApi("rating");
  }, []);
  const coloredClass = num => {
    if (+num > 30) {
      return "color-red";
    }
    if (+num < 20) {
      return "color-green";
    } else {
      return "color-secondary";
    }
  };
  const issuesMaped = issues.map(iss => {
    const removedColumn = { ...iss };
    delete removedColumn.region_num;
    return removedColumn;
  });

  const columnsHtml = {
    happy_index: {
      html: val => {
        return `${100 - +val.toFixed()}%`;
      },
      className: val => coloredClass(100 - val)
    }
  };

  const TotalEl = ({ title, tooltip }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        {title}
        <span onClick={() => setIsOpen(!isOpen)} className={"i-tooltip"}>
          i
          <span className={`tooltip ${isOpen ? "opened" : ""}`}>{tooltip}</span>
        </span>
      </div>
    );
  };

  return (
    <div className="issues-wrap container">
      {pending}
      {errors.rating && (
        <div className="error text-center">{errors.rating}</div>
      )}

      {!errors.rating && !pending && (
        <Table
          listArray={issuesMaped}
          className={"rating"}
          id={"region"}
          count={false}
          defaultPerView={5}
          perView={20}
          columns={columnsHtml}
          sortBy={"issue_total"}
          labels={{
            region: "Исполнитель",
            issue_total: <TotalEl title={"Всего сообщений"} tooltip={"обращения, которые прошли модерацию и направлены в органы власти"} />,
            overdue_total: <TotalEl title={"Просроченные"} tooltip={"обращения, на которые не был получен ответ в течение 30 дней"} />,
            happy_index: <TotalEl title={"% просрочки"} tooltip={"просроченных обращений от общего количества, направленных в орган власти обращений"} />
          }}
        />
      )}
    </div>
  );
};

export default connect(
  s2p,
  d2p
)(Issues);
