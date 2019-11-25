import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import ReactHtmlParser from "react-html-parser";

const NEWS = gql`
  {
  posts {
    nodes {
      id
      link
      title
      date
      excerpt(format: RENDERED)
      categories {
        nodes {
          name
        }
      }
    }
  }
  categories(where: {hideEmpty: true}) {
    nodes {
      name
    }
  }
  }
`;
const News = () => {
  const { loading, data } = useQuery(NEWS);

  return (
    <>
      {!loading && (
        <div className="news-wrap container">
          {data.posts.nodes.map(({ title, excerpt, id, link, date, categories }) => (
            <div className="news-item" key={id}>
              <div className="h4">{ReactHtmlParser(title)}</div>
              <div className="news-excert">{ReactHtmlParser(excerpt)}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default News;
