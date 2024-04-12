import { useTranslation } from "react-i18next"; // Импорт хука для локализации текста
import { NavLink } from "react-router-dom"; // Импорт компонента NavLink для навигации

const MenuList = ({ style, setMenu, burger }) => {
  const [t] = useTranslation(); // Инициализация хука для локализации текста
  const menu = [
    // Массив объектов с данными о пунктах меню
    {
      to: "/",
      title: "Home",
      img: "fa-solid fa-house",
    },
    {
      to: "/about",
      title: "About",
      img: "fa-solid fa-users",
    },
  ];

  return (
    <nav className={style.header_menu}>
      <button
        onClick={() => {
          setMenu && setMenu((prev) => !prev); // Закрытие меню при клике на пункт
        }}
        className={style.header_burger}
      >
        <div></div>
        {!burger && <div></div>}
        <div></div>
      </button>
      {/* Навигационное меню */}
      <div className={style.onpc}>
        <nav>
          <ul>
            {menu && // Отображение пунктов меню
              menu.map((data, id) => (
                <li title={data.title} key={id}>
                  <NavLink
                    className={({ isActive }) => [isActive && style.active]} // Добавление активного класса при активной странице
                    to={data.to} // Ссылка для перехода
                  >
                    <i className={data.img}></i>
                    {t(data.title)} {/* Локализованный текст пункта меню */}
                  </NavLink>
                </li>
              ))}
          </ul>
        </nav>
      </div>
      <div className={style.onmob}>
      {burger && (
        <nav>
          <ul>
            {menu && // Отображение пунктов меню
              menu.map((data, id) => (
                <li title={data.title} key={id}>
                  <NavLink
                    onClick={() => {
                      setMenu && setMenu((prev) => !prev); // Закрытие меню при клике на пункт
                    }}
                    className={({ isActive }) => [isActive && style.active]} // Добавление активного класса при активной странице
                    to={data.to} // Ссылка для перехода
                  >
                    <i className={data.img}></i>
                    {t(data.title)} {/* Локализованный текст пункта меню */}
                  </NavLink>
                </li>
              ))}
          </ul>
        </nav>
      )}
      </div>
    </nav>
  );
};

export default MenuList;
