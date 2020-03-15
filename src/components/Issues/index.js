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
    } else {
      return "color-secondary";
    }
  };

  const columnsHtml = {
    happy_index: {
      html: val => {
        return `${100 - +val.toFixed()}%`;
      },
      className: val => coloredClass(100 - val)
    }
  };

  return (
    <div className="issues-wrap container">
      {pending}
      {errors.rating && (
        <div className="error text-center">{errors.rating}</div>
      )}

      {!errors.rating && !pending && (
        <Table
          listArray={issues}
          className={"rating"}
          id={"region"}
          count={false}
          defaultPerView={5}
          perView={20}
          columns={columnsHtml}
          sortBy={"issue_total"}
          labels={{
            region: "Исполнитель",
            issue_total: "Всего сообщений",
            overdue_total: "Просроченные",
            happy_index: "% просрочки"
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
