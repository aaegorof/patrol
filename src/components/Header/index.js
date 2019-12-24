import React, { useState, useEffect } from "react";
import appStore from "../../img/AppStore.svg";
import googlePlay from "../../img/GooglePlay.svg";
import "./styles.scss";
import { Link } from "react-scroll";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const HOMEPAGE = gql`
    {
        page(id: "cGFnZTo4") {
            acf {
                applelink
                googleplay
            }
        }
    }
`;


export const menu = {
  step1: "Как это работает",
  map: "Карта обращений",
  statistics: "Статистика",
  info: "Полезная информация",
  news: "Новости"
};

const Header = () => {
  const { loading, data } = useQuery(HOMEPAGE)
  const [isToggledMenu, toggleMenu] = useState(false);
  const [links, setLinks] = useState({applelink: "#", googleplay: "#"})

  useEffect(() => {
    if (!loading) {
      setLinks(data.page.acf);
    }
  }, [data]);

  return (
    <div className="header-wrap">
      <div className="main-header container">
        <nav
          className="main-menu"
          style={{
            transform:
              !isToggledMenu && window.innerWidth < 812
                ? "translateX(-120%)"
                : "translateX(0)"
          }}
        >
          {Object.entries(menu).map(([key, val]) => (
            <Link
              to={key}
              key={key}
              spy={true}
              activeClass="active"
              className={`nav-link ${key}`}
              hashSpy={true}
              smooth="easeOutQuint"
              duration={1250}
            >
              {val}
            </Link>
          ))}
        </nav>
        <div className="push-right market-buttons">
          <a href={links.applelink} className="btn-market">
            <img src={appStore} />
          </a>
          <a href={links.googleplay} className="btn-market">
            <img src={googlePlay} />
          </a>
        </div>
        <div
          className="humburger push-right show-md-max"
          onClick={() => toggleMenu(!isToggledMenu)}
        ></div>
      </div>
    </div>
  );
};

export default Header;
