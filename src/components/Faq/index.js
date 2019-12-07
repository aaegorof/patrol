import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "./style.scss";

const FOOTER = gql`
  {
    page(id: "cGFnZTo4") {
      faq {
        vopros {
          nazvanie
          kartinka {
            altText
            sourceUrl
          }
          term {
            ... on Tag {
              name
            }
          }
        }
      }
    }
  }
`;

const Faq = () => {
  const { loading, data } = useQuery(FOOTER);
  const [faqData, changeFields] = useState(null);

  useEffect(() => {
    if (!loading) {
      changeFields(data.page.faq.vopros);
    }
  }, [data]);

  return faqData && <FaqView faq={faqData}/>;
};

const FaqView = ({ faq }) => {
  const [opened, toggleOpened] = useState([]);

  const terms = faq.reduce((prev, cur) => {
    const names = cur.term.map(term => term.name);
    if (!prev.includes(names)) {
      return names;
    }
  }, []);
  const onToggle = id => e => {
    opened.includes(id) ?
        toggleOpened(opened.filter(ids => ids !== id)) : toggleOpened([...opened, id]);
  };

  return (
    <div className="faq-wrap container">
      {terms.map(term => (
        <React.Fragment>
          <div className="term-name h2" key={term}>
            {term}
          </div>
          <div className="faq-term-wrap">
            {faq
              .filter(f => f.term.some(el => el.name === term))
              .map(i => (
                <>
                  <div
                    className={`faq-term ${opened.includes(term + i.nazvanie) ? "opened" : ""}`}
                    key={term + i.nazvanie}
                    onClick={onToggle(term + i.nazvanie)}
                  >
                    <div className="h4"><span className="dashed">{i.nazvanie}</span> <div className="plus"></div></div>
                    <div className="faq-answer">
                      <img src={i.kartinka.sourceUrl} alt={i.kartinka.alt} />
                    </div>
                  </div>

                </>
              ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Faq;
