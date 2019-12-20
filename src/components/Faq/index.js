import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "./style.scss";

const FAQ = gql`
    {
        page(id: "cGFnZTo4") {
            faq {
                vopros {
                    nazvanie
                    gallery {
                        altText
                        sourceUrl
                        excerpt
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


const FaqView = ({ faq }) => {
  const [opened, toggleOpened] = useState([]);

  const terms = faq.reduce((prev, cur) => {
    const names = cur.term.map(term => term.name);
    if(!cur.term.length) {
      return prev
    }
    if (!prev.includes(names)) {
      return names;
    }
  }, []);

  const onToggle = id => e => {
    opened.includes(id)
        ? toggleOpened(opened.filter(ids => ids !== id))
        : toggleOpened([...opened, id]);
  };
  console.log(faq, terms);

  return (
      <div className="faq-wrap container">
        {terms.map(term => (
            <div key={term}>
              <div className="term-name h2">
                {term}
              </div>
              <div className="faq-term-wrap">
                {faq
                    .filter(f => f.term.some(el => el.name === term))
                    .map(i => (
                        <div key={term + i.nazvanie}>
                          <div
                              className={`faq-term ${
                                  opened.includes(term + i.nazvanie) ? "opened" : ""
                              }`}
                              onClick={onToggle(term + i.nazvanie)}
                          >
                            <div className="h4">
                              <span className="dashed">{i.nazvanie}</span>
                              <div className="plus"></div>
                            </div>
                            <div className="faq-answer row">
                              {i.gallery.map(img => <div className="faq-images col-lg-3">
                                <img src={img.sourceUrl} alt={img.alt} />
                                <div className="faq-description" dangerouslySetInnerHTML={{__html:img.excerpt}}/>
                              </div>)}
                            </div>
                          </div>
                        </div>
                    ))}
              </div>
            </div>
        ))}
      </div>
  );
};



const Faq = () => {
  const { loading, data } = useQuery(FAQ);
  const [faqData, changeFields] = useState(null);

  useEffect(() => {
    if (!loading) {
      changeFields(data.page.faq.vopros);
    }
  }, [data]);

  return (faqData ? <FaqView faq={faqData}/> : <div>None</div>)
};

export default Faq;
