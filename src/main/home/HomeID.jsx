import { useState, useEffect } from "react";
import DateFun from "../../components/DateFun";
import { useTranslation } from "react-i18next";
import { db } from "../..";
import { doc, getDoc } from "firebase/firestore";
import Section from "../../UI_kit/Section";
import Style from "../../styles/main/home/homeID.module.scss";
import { Link } from "react-router-dom";
import Preloader from "../../components/Preloaders/Preloader";

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

  console.log(events);

  if (!events) return <Preloader />;

  return (
    <main>
      <Section>
        <div className={Style.event}>
          {/* 
          {events && <p>{DateFun(events.dateEnd)}</p>} 
          */}

          <p className={Style.event_theme}>
            Главная / {events.theme} / {events && DateFun(events.createdAt)}
          </p>
          <div className={Style.event_block}>
            <div className={Style.event_block_img}>
              <img width={400} height={200} src={events.img} alt="event img" />
            </div>
            <div className={Style.event_block_content}>
              <h1>{events.theme}</h1>
              <p className={Style.event_block_content_company}>
                Организатор: {events.company}
              </p>
              <p className={Style.event_block_content_type}>
                Тип: {events.type}
              </p>
              <hr />
              <p className={Style.event_block_content_title}>Описание</p>
              <p className={Style.event_block_content_desk}>{events.desk}</p>
              <p className={Style.event_block_content_date}>
                Начало: {events && DateFun(events.dateEnd)}
              </p>
              <Link target="_blank" to={events.link}>
                <button className={Style.event_block_content_link}>
                  Перейти
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default HomeID;
