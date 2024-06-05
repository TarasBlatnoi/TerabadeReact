import NavbarInteractiveItem from "./NavbarInteractiveItem"

const NavbarInteractive = () => {
  return (
    <nav className="navbar-interactive">
      <ul className="ul-navbar-interactive">
        <NavbarInteractiveItem />
        <li className="li-navbar-interactive">
          <p>
            <a href="">Обране</a>
          </p>
          <div className="wrapper-sub-li-navbar-interactive">
            <p className="sub-li-navbar-interactive">
              <a href="">Трендові</a>
            </p>
            <p className="sub-li-navbar-interactive">
              <a href="">Лідери продажу</a>
            </p>
            <p className="sub-li-navbar-interactive">
              <a href="">Набори</a>
            </p>
            <p className="sub-li-navbar-interactive">
              <a href="">Розпродаж</a>
            </p>
            <p className="sub-li-navbar-interactive">
              <a href="">Новинка</a>
            </p>
          </div>
        </li>
        <li className="li-navbar-interactive">
          <p>
            <a href="">Обмежений час</a>
          </p>
          <div className="wrapper-sub-li-navbar-interactive">
            <p className="sub-li-navbar-interactive">
              <a href="">
                Знижка <span className="span-courier">20%</span>
              </a>
            </p>
          </div>
        </li>
        <li className="li-navbar-interactive">
          <p>
            <a href="">Взуття</a>
          </p>
          <div className="wrapper-sub-li-navbar-interactive">
            <p className="sub-li-navbar-interactive">
              <a href="">Повсякденні</a>
            </p>
            <p className="sub-li-navbar-interactive">
              <a href="">Jordan</a>
            </p>
            <p className="sub-li-navbar-interactive">
              <a href="">Air Max</a>
            </p>
            <p className="sub-li-navbar-interactive">
              <a href="">
                Air Force <span className="span-courier">1</span>
              </a>
            </p>
            <p className="sub-li-navbar-interactive">
              <a href="">Dunks & Blazers</a>
            </p>
          </div>
        </li>
        <li className="li-navbar-interactive">
          <p>
            <a href="">Спорт</a>
          </p>
          <div className="wrapper-sub-li-navbar-interactive">
            <p className="sub-li-navbar-interactive nowrap">
              <a href="">Футбол</a>
            </p>
            <p className="sub-li-navbar-interactive">
              <a href="">Баскетбол</a>
            </p>
            <p className="sub-li-navbar-interactive">
              <a href="">Теніс</a>
            </p>
            <p className="sub-li-navbar-interactive">
              <a href="">Гольф</a>
            </p>
            <p className="sub-li-navbar-interactive">
              <a href="">Спорт-зал</a>
            </p>
            <p className="sub-li-navbar-interactive">
              <a href="">Біг</a>
            </p>
            <p className="sub-li-navbar-interactive">
              <a href="">Плавання</a>
            </p>
            <p className="sub-li-navbar-interactive">
              <a href="">Йога</a>
            </p>
          </div>
        </li>
      </ul>
      <img src="images/ManHeader.svg" alt="Male" className="man-image" />
    </nav>
  )
}

export default NavbarInteractive
