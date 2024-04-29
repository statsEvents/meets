import Section from "../../UI_kit/Section";
import Style from "../../styles/main/profile/profile.module.scss";
import { useState } from "react"; // Импорт хуков useState, useEffect, useCallback
import { firestore, db } from "../../index"; // Импорт Firestore и базы данных
import { useTranslation } from "react-i18next"; // Импорт хука для локализации текста
import { ref as refe, uploadBytes, getDownloadURL } from "firebase/storage"; // Импорт функций для работы с хранилищем файлов
import { Timestamp, doc, setDoc } from "firebase/firestore"; // Импорт функций Firestore
import eventsLst from "./events.json";

const Profile = () => {
  const [t] = useTranslation(); // Инициализация хука для локализации текста
  const [image, setImage] = useState(null); // Состояние для хранения изображения новости
  const [theme, setTheme] = useState(""); // Состояние для хранения темы новости
  const [desk, setDesk] = useState(""); // Состояние для хранения описания новости
  const [uidDoc, setUidDoc] = useState("post=" + Math.random(10000)); // Состояние для хранения идентификатора документа
  const [idImg, setIdImg] = useState(Math.random(1000000)); // Состояние для хранения идентификатора изображения
  const [company, setCompany] = useState("");
  const [link, setLink] = useState("");
  const [dateEnd, setDateEnd] = useState(new Date().toLocaleString());
  const [type, setType] = useState("");
  const [search, setSearch] = useState(false);
  document.title = `Meets | ${t("profile")}`; // Установка заголовка страницы

  const firebaseTimestamp = (dateString) => {
    const [date, time] = dateString.split(", ");
    const [day, month, year] = date.split(".");
    const [hours, minutes, seconds] = time.split(":");

    const dateObj = new Date(
      `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
    );
    const timestamp = Timestamp.fromDate(dateObj);

    return timestamp;
  };

  const isURL = (str) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  const inputDateString = dateEnd;
  const timestamp = firebaseTimestamp(inputDateString);

  const send = async () => {
    if (
      image === null ||
      image === "" ||
      image === undefined ||
      !isNaN(image) ||
      theme === "" ||
      desk === "" ||
      isURL(link) === false ||
      company === "" ||
      type === ""
    ) {
      alert(t("P-allInput"));
      return false;
    }
    const imageRef = refe(firestore, `img/${image.name + idImg}`);

    await uploadBytes(imageRef, image).then((e) => {
      getDownloadURL(e.ref)
        .then((url) => {
          setDoc(doc(db, "events", uidDoc), {
            desk: desk,
            theme: theme,
            company: company,
            link: link,
            type: type,
            dateEnd: timestamp,
            createdAt: Timestamp.fromDate(new Date()),
            changed: false,
            img: url,
            imgName: image.name + idImg,
            id: uidDoc,
          });

          reset();
        })
        .then(() => {
          alert(t("P-createdEvent"));
        });
    });
  };

  // Функция для сброса данных формы
  const reset = () => {
    setImage((prev) => (prev = ""));
    setDesk((prev) => (prev = ""));
    setTheme((prev) => (prev = ""));
    setUidDoc((prev) => (prev = "event=" + Math.random(10000)));
    setIdImg((prev) => (prev = Math.random(10000)));
    setLink((prev) => (prev = ""));
    setCompany((prev) => (prev = ""));
    setDateEnd((prev) => (prev = new Date().toLocaleString()));
    setType((prev) => (prev = ""));
  };

  // Обработка перетаскивания файла
  const handleDrop = (e) => {
    e.preventDefault();
    setImage((prev) => (prev = e.dataTransfer.files[0]));
  };


  return (
    <main>
      <Section>
        <div className={Style.profile}>
          <div className={Style.profile_first}>
            <div>
              <h1>{t("create")}</h1>
              <input
                value={theme}
                className={Style.profile_theme}
                type="text"
                placeholder={t("eventName")}
                onChange={(e) => {
                  setTheme((prev) => (prev = e.target.value));
                }}
              />
              <div
                className={Style.profile_upload}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() =>
                  document.querySelector('input[type="file"]').click()
                }
              >
                <p>{image ? t("P-img2") : t("P-img1")}</p>
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={(e) => setImage(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <textarea
                value={desk}
                onChange={(e) => {
                  setDesk((prev) => (prev = e.target.value));
                }}
                className={Style.profile_description}
                placeholder={t("desc")}
              ></textarea>
              <input
                value={company}
                type="text"
                placeholder={t("company")}
                className={Style.profile_theme}
                onChange={(e) => {
                  setCompany((prev) => (prev = e.target.value));
                }}
              />
              <input
                value={link}
                type="text"
                placeholder={t("link")}
                className={Style.profile_theme}
                onChange={(e) => {
                  setLink((prev) => (prev = e.target.value));
                  setSearch((prev) => (prev = true));
                }}
              />

              <div className={Style.profile_type}>
                <input
                  value={t(type)}
                  type="text"
                  placeholder={t("type")}
                  className={Style.profile_theme}
                  onChange={(e) => {
                    setType((prev) => (prev = e.target.value));
                  }}
                  onClick={() => {
                    setSearch((prev) => (prev = true));
                  }}
                />
                {search && (
                  <div className={Style.profile_type_list}>
                    {eventsLst &&
                      eventsLst.map(
                        (data) =>
                          data.name.includes(type) && (
                            <article
                              onClick={() => {
                                setType((prev) => (prev = data.name));
                                setSearch((prev) => (prev = false));
                              }}
                              key={data.name}
                            >
                              {t(data.name)}
                            </article>
                          )
                      )}
                  </div>
                )}
              </div>

              <input
                value={dateEnd}
                type="text"
                placeholder={t("dateStart")}
                className={Style.profile_theme}
                onChange={(e) => {
                  setDateEnd((prev) => (prev = e.target.value));
                }}
              />
              <button className={Style.profile_create} onClick={send}>
                {t("create")}
              </button>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Profile;
