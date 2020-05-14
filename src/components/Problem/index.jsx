import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const PROBLEM = gql`
  {
    page(id: "cGFnZTo4") {
      faq {
        oprobleme {
          nazvanie
          text
          mainImg {
            sourceUrl
          }
          gallery {
            altText
            sourceUrl
            excerpt
          }
        }
      }
    }
  }
`;

const ProblemView = ({ fields }) => {
  const [opened, toggleOpened] = useState([]);
  const { nazvanie, text, mainImg, gallery } = fields;

  const onToggle = id => e => {
    opened.includes(id)
      ? toggleOpened(opened.filter(ids => ids !== id))
      : toggleOpened([...opened, id]);
  };

  return (
    <div>
      {mainImg && <img className="tag-img" src={mainImg.sourceUrl} />}
      {fields && (
        <div className="row">
          <div
            name="oprobleme"
            className={`faq-term ${opened.includes(nazvanie) ? "opened" : ""}`}
          >
            <div className="h4" onClick={onToggle(nazvanie)}>
              <span className="dashed">{nazvanie}</span>
              <div className="plus"></div>
            </div>

            <div
              className="faq-answer-opened description"
              dangerouslySetInnerHTML={{ __html: text }}
            />

            {gallery && (
              <div className={`faq-answer`}>
                {gallery.map(img => (
                  <div className="faq-images">
                    <img src={img.sourceUrl} alt={img.alt} />
                    <div
                      className="faq-description"
                      dangerouslySetInnerHTML={{ __html: img.excerpt }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Problem = () => {
  const { loading, data } = useQuery(PROBLEM);
  const [fields, changeFields] = useState(null);

  useEffect(() => {
    if (!loading) {
      changeFields(data.page);
    }
  }, [data]);

  return (
    <div className="problem-wrap">
      <div className="container">
        <div className="term-name h2">О проблеме</div>
        {fields ? (
          fields.faq.oprobleme.map(problem => <ProblemView fields={problem} />)
        ) : (
          <div>None</div>
        )}
      </div>
    </div>
  );
};

export default Problem;
