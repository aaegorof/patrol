import React from "react";
import appStore from "../../img/AppStore.svg";
import googlePlay from "../../img/GooglePlay.svg";
import "./styles.scss";
import { Link } from "react-scroll";

export const menu = {
  works: "Как это работает",
  map: "Карта обращений",
  statistics: "Статистика",
  info: "Полезная информация",
  news: "Новости"
};

const Header = () => {
  return (
    <div className="header-wrap">
      <div className="main-header container">
        <nav className="main-menu">
          {Object.entries(menu).map(([key, val]) => (
            <Link
              activeClass="active"
              hashSpy={key}
              className="nav-link"
              to={key}
              spy={true}
              smooth={true}
              duration={250}
              key={key}
            >
              {val}
            </Link>
          ))}
        </nav>
        <div className="push-right market-buttons">
          <a href="#" className="btn-market">
            <img src={appStore} />
          </a>
          <a href="#" className="btn-market">
            <img src={googlePlay} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
