import React from "react";
import appStore from "../../img/AppStore.svg"
import googlePlay from "../../img/GooglePlay.svg"
import "./styles.scss";

export const menu = {
  works: "Как это работает",
  map: "Карта обращений",
  statistics: "Статистика",
  info: "Полезная информация",
  news: "Новости"
};

const Link = ({ link, title }) => {
  return (
    <a href={`#${link}`} className="nav-link">
      {title}
    </a>
  );
};

const Header = () => {
  return (
    <div className="header-wrap">
      <div className="main-header container">
        <nav className="main-menu">
          {Object.entries(menu).map(([key, val]) => (
            <Link link={key} title={val} key={key}/>
          ))}
        </nav>
        <div className="push-right market-buttons">
          <a href="#" className="btn-market"><img src={appStore}/></a>
          <a href="#" className="btn-market"><img src={googlePlay}/></a>
        </div>
      </div>
    </div>
  );
};

export default Header;
