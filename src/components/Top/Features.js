import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import ReactHtmlParser from "react-html-parser";

const FOOTER = gql`
  {
    page(id: "cGFnZTo4") {
      faq {
        features {
          title
          text
          icon {
            sourceUrl
          }
        }
      }
    }
  }
`;

const Features = () => {
  const { loading, data } = useQuery(FOOTER);
  const [fields, changeFields] = useState(null);

  useEffect(() => {
    if (!loading) {
      changeFields(data.page.faq.features);
    }
  }, [data]);

  return (
    <div className="features-wrap">
      <div className="container">
        {fields && (
          <div className="row">
            {fields.map(fe => (
              <div className="feature-item">
                <img src={fe.icon.sourceUrl} />
                <div className="feature-title">{fe.title}</div>
                <div className="feature-text" dangerouslySetInnerHTML={{__html:fe.text}}/>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Features;
