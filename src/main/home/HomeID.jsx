import { useState, useEffect } from "react";
import DateFun from "../../components/DateFun";
import { useTranslation } from "react-i18next";
import { db } from "../..";
import { doc, getDoc } from "firebase/firestore";
import Section from "../../UI_kit/Section";
import Style from "../../styles/main/home/homeID.module.scss";
import { Link } from "react-router-dom";
import Preloader from "../../components/Preloaders/Preloader";
import ShareLink from "../../components/ShareLink";

const HomeID = () => {
  const [t] = useTranslation();
  const stateLoc = window.location.pathname.replace("/", "");
  const [events, setEvents] = useState();

  useEffect(() => {
    const getNews = async () => {
      const news = await getDoc(doc(db, "events", stateLoc));
      setEvents((prev) => (prev = news.data()));
    };
    getNews();
  }, [stateLoc]);

  if (!events) return <Preloader />;

  document.title = `Meets | ${events && events.theme}`;

  return (
    <main>
      <Section>
        <div className={Style.event}>
          <p className={Style.event_theme}>
            {t("Home")} / {events.theme} / {events && DateFun(events.createdAt)}
          </p>
          <div className={Style.event_block}>
            <div className={Style.event_block_img}>
              <img width={400} height={200} src={events.img} alt="event img" />
            </div>
            <div className={Style.event_block_content}>
              <h1>{events.theme}</h1>
              <p className={Style.event_block_content_company}>
                {t("company")}: {events.company}
              </p>
              <p className={Style.event_block_content_type}>
                {t("type")}: {t(events.type)}
              </p>
              <hr />
              <p className={Style.event_block_content_title}>{t("desc")}</p>
              <p className={Style.event_block_content_desk}>{events.desk}</p>
              <p className={Style.event_block_content_date}>
                {t("dateStart")}: {events && DateFun(events.dateEnd)}
              </p>
              <Link target="_blank" to={events.link}>
                <button className={Style.event_block_content_link}>
                  {t("goto")}
                </button>
              </Link>

              <ShareLink
                title={events && events.theme}
                shareRes={window.location.href}
              />
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default HomeID;
