import Section from "../../UI_kit/Section";
import Style from "../../styles/main/profile/profile.module.scss";
import { useState } from "react"; // Импорт хуков useState, useEffect, useCallback
import { firestore, db } from "../../index"; // Импорт Firestore и базы данных
import { useTranslation } from "react-i18next"; // Импорт хука для локализации текста
import { ref as refe, uploadBytes, getDownloadURL } from "firebase/storage"; // Импорт функций для работы с хранилищем файлов
import { Timestamp, doc, setDoc } from "firebase/firestore"; // Импорт функций Firestore

const Profile = () => {
  const [t] = useTranslation(); // Инициализация хука для локализации текста
  const [image, setImage] = useState(null); // Состояние для хранения изображения новости
  const [theme, setTheme] = useState(""); // Состояние для хранения темы новости
  const [desk, setDesk] = useState(""); // Состояние для хранения описания новости
  const [uidDoc, setUidDoc] = useState("post=" + Math.random(10000)); // Состояние для хранения идентификатора документа
  const [idImg, setIdImg] = useState(Math.random(1000000)); // Состояние для хранения идентификатора изображения
  const [changing, setChanging] = useState(false); // Состояние для отображения формы редактирования новости
  document.title = `Jomart jurek | ${t("profile")}`; // Установка заголовка страницы

  const send = async () => {
    if (
      image === null ||
      image === "" ||
      image === undefined ||
      !isNaN(image) ||
      theme === "" ||
      desk === ""
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
            createdAt: Timestamp.fromDate(new Date()),
            changed: false,
            img: url,
            imgName: image.name + idImg,
            id: uidDoc,
          });

          reset();
        })
        .then(() => {
          alert(t("P-createdNews"));
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
              <h1>Создать</h1>
              <input
                value={theme}
                className={Style.profile_theme}
                type="text"
                placeholder={'Название мероприятия'}
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
                placeholder={'Описание'}
              ></textarea>
              <input
                type="text"
                placeholder="Название компании"
                className={Style.profile_theme}
              />
              <input
                type="text"
                placeholder="Ссылка на конференцию"
                className={Style.profile_theme}
              />
              <div className={Style.profile_label}>
                <label
                  onClick={() => {
                    setChanging((prev) => !prev);
                  }}
                >
                  Огранчить места
                </label>
                <input
                  type="checkbox"
                  onChange={() => {
                    setChanging((prev) => !prev);
                  }}
                  checked={changing}
                />
              </div>

              {changing && (
                <input
                  className={Style.profile_theme}
                  type="number"
                  placeholder="Введите кол-во мест"
                />
              )}
              <button className={Style.profile_create} onClick={send}>
                Создать
              </button>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Profile;

// Название компании, тема, ссылка, описание, кол-во участников огран, картинка
