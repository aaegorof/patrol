import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import ReactHtmlParser from 'react-html-parser';

const NEWS = gql`
  {
    posts {
      nodes {
        id
        link
        postId
        slug
        title
        excerpt
        content
      }
    }
  }
`;
const News = () => {
  const { loading, data } = useQuery(NEWS);

  return (
    <>
      {!loading && (
        <div className="News-wrap">
          {data.posts.nodes.map(({ title, excerpt, id }) => (
            <div className="news-item" key={id}>
              <div className="h4">{title}</div>
              <div className="news-excert">{ReactHtmlParser(excerpt)}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default News;
