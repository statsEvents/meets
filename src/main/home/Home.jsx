import Section from "../../UI_kit/Section";
import Style from "../../styles/main/home/home.module.scss";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../index";
import { query, orderBy, collection } from "firebase/firestore";
import DateFun from "../../components/DateFun";
import Preloader from "../../components/Preloaders/Preloader";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Home = () => {
  const [t] = useTranslation();
  document.title = `Meets | ${t("Home")}`; // Установка заголовка страницы
  const [events, loading] = useCollectionData(
    query(collection(db, "events"), orderBy("createdAt", "desc"))
  );

  if (loading) return <Preloader />;

  return (
    <main>
      <Section>
        <div className={Style.home}>
          <h1>{t("allEvents")}</h1>
          <div className={Style.home_items}>
            {events &&
              events.map((data) => (
                <Link key={data.id} to={"/" + data.id}>
                  <article className={Style.home_item}>
                    <div className={Style.home_item_org}>
                      <p className={Style.home_item_company}>
                        <i className="fa-solid fa-building"></i>
                        {data.company}
                      </p>
                      <p>
                        <i className="fa-solid fa-calendar"></i>
                        {DateFun(data.dateEnd)}
                      </p>
                    </div>
                    <img height={200} width={400} src={data.img} alt="img" />
                    <p className={Style.home_item_name}>
                      <i className="fa-solid fa-pen"></i> {data.theme}
                    </p>
                    <p>
                      <i className="fa-solid fa-comments"></i>
                      {t(data.type)}
                    </p>
                    <button className={Style.home_item_link}>
                      <i className="fa-solid fa-info"></i> {t("more")}
                    </button>
                  </article>
                </Link>
              ))}
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Home;
