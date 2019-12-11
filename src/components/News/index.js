import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import ReactHtmlParser from "react-html-parser";
import Slider from "react-slick";
import * as moment from "moment";
import "moment/locale/ru";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss";
import arrow from "../../img/icon/arrow.svg";

moment.locale("ru");

const NEWS = gql`
  {
    posts {
      nodes {
        id
        link
        title
        date
        content
        excerpt(format: RENDERED)
        categories {
          nodes {
            name
          }
        }
      }
    }
    categories(where: { hideEmpty: true }) {
      nodes {
        name
        id
      }
    }
  }
`;

const Arrow = props => {
  return (
    <img src={arrow} className={props.className} onClick={props.onClick} />
  );
};

const News = () => {
  const { loading, data } = useQuery(NEWS);
  const [activeCat, changeCat] = useState(null);
  const [newsList, filterNews] = useState(null);

  const newList = name => {
    return data.posts.nodes.filter(i =>
      i.categories.nodes.map(i => i.name).includes(name)
    );
  };

  useEffect(() => {
    if (!loading) {
      const initCat = data.categories.nodes[0].name;
      filterNews(newList(initCat));
      changeCat(initCat);
    }
  }, [data]);

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 350,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: <Arrow />,
    nextArrow: <Arrow back={true} />,
    responsive: [
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      {!loading && (
        <div className="news-wrap container">
          <div className="categories">
            {data.categories.nodes.map(({ name, id }) => (
              <div
                key={id}
                className={`category-name ${
                  activeCat === name ? "active" : ""
                }`}
                onClick={() => {
                  changeCat(name);
                  filterNews(newList(name));
                }}
              >
                {name}
              </div>
            ))}
          </div>

          {newsList && (
            <Slider {...sliderSettings}>
              {newsList.map(({ title, content, id, date }) => (
                <div className="news-item" key={id}>
                  <div className="date">
                    {moment(date).format("D MMMM YYYY")}
                  </div>
                  <div className="h4">{ReactHtmlParser(title)}</div>
                  <div className="news-content">{ReactHtmlParser(content)}</div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      )}
    </>
  );
};

export default News;
