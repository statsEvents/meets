import { Link } from "react-router-dom"; // Импорт компонента Link из react-router-dom для создания ссылок
import { useTranslation } from "react-i18next"; // Импорт хука для локализации текста
import Style from "../styles/menu/Footer/Footer.module.scss"; // Импорт стилей

const Footer = () => {
  const [t] = useTranslation(); // Инициализация хука для локализации текста

  const social = [
    {
      to: "https://www.instagram.com/markeloff1703?igsh=bGdienpoeHpwbHpp",
      src: "../../img/social/instagram.png",
      alt: "instagram",
    },
    {
      to: "https://vk.com/mrkklf",
      src: "../../img/social/vk.png",
      alt: "VK",
    },
    {
      to: "https://t.me/mrkllff",
      src: "../../img/social/tg.png",
      alt: "Telegram",
    },
  ];

  return (
    <footer className={Style.footer}>
      {/* Обертка для колонтитула */}
      <section className={Style.footer_block}>
        <div className={Style.footer_rights}>
          {/* Блок с информацией о правах */}
          ©️ Meets {new Date().getFullYear()} {/* Текст с годом */}
        </div>
          {/* Секция с контентом */}
          <div className={Style.footer_social_position}>
          {/* Позиционирование социальных иконок */}
          <div>
            <h4>{t('social')}</h4>
            <div className={Style.footer_social}>
              {/* Отображение списка ссылок на социальные сети */}
              {social &&
                social.map((data, id) => (
                  <Link key={id} target="_blank" to={data.to}>
                    <img src={data.src} alt={data.alt} />
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
