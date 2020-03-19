import React, { useEffect, useState } from "react";
import {fetchApi} from "../../api";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useDispatch, useSelector } from "react-redux";

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
  const dispatch = useDispatch()
  const {general, counter} = useSelector( state => state)

  useEffect(() => {
    dispatch(fetchApi("general"))
    dispatch(fetchApi("counter"))
  }, [])

  useEffect(() => {
    if (!loading) {
      changeFields(data.page.faq.features);
    }
  }, [data]);

  return (
    <div className="features-wrap">
        {fields && (
          <div className="row">
            {fields.map( (fe, i) => (
              <div className="feature-item" key={fe.title}>
                <img src={fe.icon.sourceUrl} />
                {
                  i === 0 && <div className="feature-title">{general.all}</div>
                }
                {
                  i === 1 && <div className="feature-title">{fe.title}</div>
                }
                {
                  i === 2 && <div className="feature-title">{counter.solved}</div>
                }
                <div
                    className="feature-text"
                    dangerouslySetInnerHTML={{ __html: fe.text }}
                />
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default Features;
