import React, {useState} from "react";
import appStore from "../../img/AppStore.svg";
import googlePlay from "../../img/GooglePlay.svg";
import "./styles.scss";
import { Link } from "react-scroll";
import { is } from "ramda";

export const menu = {
  step1: "Как это работает",
  map: "Карта обращений",
  statistics: "Статистика",
  info: "Полезная информация",
  news: "Новости"
};

const Header = () => {
  const [isToggledMenu, toggleMenu] = useState(false)
  return (
    <div className="header-wrap">
      <div className="main-header container">
        <nav className="main-menu" style={{transform: !isToggledMenu && window.innerWidth < 425 ? "translateX(-120%)" : "translateX(0)"}}>
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
          <a href="#" className="btn-market">
            <img src={appStore} />
          </a>
          <a href="#" className="btn-market">
            <img src={googlePlay} />
          </a>
        </div>
        <div className="humburger push-right show-sm-max" onClick={() => toggleMenu(!isToggledMenu)}></div>
      </div>
    </div>
  );
};

export default Header;
