import { useTranslation } from "react-i18next";
import Section from "../../UI_kit/Section";
import Style from "../../styles/main/about/about.module.scss";
const About = () => {
  const [t] = useTranslation();
  document.title = `Meets | ${t("About")}`; // Установка заголовка страницы

  return (
    <main>
      <Section>
        <div className={Style.about}>
          <h1>{t("About")}</h1>
          <div className={Style.about_content}>
            <img src="../img/logo.png" alt="logo" />
            <div className={Style.about_content_desc}>
              <h2>{t("AboutCom")}</h2>
              <p>
                {t("welcome")}
                <br /> <br />
                <b>{t("miss")}</b>
                <br /> <br />
                {t("webelive")}
                <br />
                <br />
                <b>{t("weadd")}</b>
                <br />
                <br />
                <ul>
                  <li>{t("weFirst")}</li>
                  <li>{t("weSecond")}</li>
                  <li>{t("weThird")}</li>
                </ul>
                <br />
                <b>{t("team")}</b>
                <br />
                <br />
                {t("teamText")}
                <br />
                <br />
                <b>{t("joinUs")}</b>
                <br />
                <br />
                {t("joinUsText")}
              </p>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default About;
