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
          singleImg
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
      tags {
          edges {
              node {
                  name
                  id
                  acfTags {
                      tagImg {
                          sourceUrl
                      }
                  }
              }
          }
      }
  }
`;

const FaqView = ({ faq, tags }) => {
  const [opened, toggleOpened] = useState([]);

  const terms = faq.reduce((prev, cur) => {
    if (!cur.term.length) {
      return prev;
    }
    const names = cur.term.map(term => term.name);
    for (let name of names) {
      if (!prev.includes(name)) {
        return [...prev, name];
      }
    }
    return prev;
  }, []);

  const onToggle = id => e => {
    opened.includes(id)
      ? toggleOpened(opened.filter(ids => ids !== id))
      : toggleOpened([...opened, id]);
  };

  return (
    <div className="faq-wrap container">
      {tags.map(tag => {
        const {name, acfTags: {tagImg: tagImg} } = tag.node

        return (
            <div key={tag}>
            <div className="term-name h2">{name}</div>
              {tagImg && <img src={tagImg.sourceUrl}/>}

              <div className="faq-term-wrap">
                {faq
                    .filter(f => f.term.some(el => el.name === name))
                    .map(i => (
                        <div key={name + i.nazvanie}>
                          <div
                              className={`faq-term ${
                                  opened.includes(name + i.nazvanie) ? "opened" : ""
                              }`}
                          >
                            <div className="h4" onClick={onToggle(name + i.nazvanie)}>
                              <span className="dashed">{i.nazvanie}</span>
                              <div className="plus"></div>
                            </div>
                            <div className={`faq-answer ${i.singleImg ? "single-img" : ""}`}>
                              {i.gallery.map(img => (
                                  <div className="faq-images">
                                    <img src={img.sourceUrl} alt={img.alt} />
                                    <div
                                        className="faq-description"
                                        dangerouslySetInnerHTML={{ __html: img.excerpt }}
                                    />
                                  </div>
                              ))}
                            </div>
                          </div>
                        </div>
                    ))}
              </div>
            </div>
        )
      })}
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

  return faqData ? <FaqView faq={faqData} tags={data.tags.edges}/> : <div>None</div>;
};

export default Faq;
