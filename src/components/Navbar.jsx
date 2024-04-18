import { auth, db, firestore } from "../index";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Login from "./Login";
import Style from "../styles/components/navbar/navbar.module.scss";
import Lang from "../menu/Lang";
import LangAbsolute from "../menu/LangAbsolute";
import MenuList from "../menu/MenuList";
import {
  collection,
  getDocs,
  deleteDoc,
  Timestamp,
  getDoc,
  doc,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [t] = useTranslation();
  const [lang, setLang] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [login, setLogin] = useState(false);
  const signBtnRef = useRef(null);
  const [burger, setBurger] = useState(false);
  const [admin, setAdmin] = useState(false);
  const uid = user ? user.uid : "";

  useEffect(() => {
    if (uid) {
      const userGet = async () => {
        const data = await getDoc(doc(db, "users", uid));
        setAdmin((prev) => (prev = data.data().admin));
      };

      userGet();
    }
  }, [uid, setAdmin]);

  useEffect(() => {
    const deleteDocs = async () => {
      const querySnapshot = await getDocs(collection(db, "events"));

      querySnapshot.forEach((E) => {
        if (
          E.data().dateEnd.toDate() < Timestamp.fromDate(new Date()).toDate()
        ) {
          deleteObject(ref(firestore, `img/${E.data().imgName}`));
          deleteDoc(E.ref);
        }
      });
    };
    deleteDocs();
  }, []);

  const setMenu = () => {
    setUserMenu((prev) => !prev);
  };

  const signOut = () => {
    const resExit = window.confirm(t("really_ex"));
    resExit && auth.signOut();
    setUserMenu((prev) => !prev);
    setLogin((prev) => (prev = false));
  };

  const signIn = () => {
    setLogin((prev) => (prev = true));
  };

  useEffect(() => {
    window.addEventListener("keyup", (e) => {
      if (e.key === "Escape") setUserMenu((prev) => (prev = false));
    });
  }, []);

  return (
    <>
      <header className={Style.header}>
        <div className={Style.onmob}>
          <MenuList setMenu={setBurger} burger={burger} style={Style} />
        </div>
        <Link className={Style.header_logo_pos} to={"/"}>
          <img
            className={Style.header_logo}
            src="../../img/logo.png"
            width={110}
            alt="logo"
          />
        </Link>

        <div className={Style.onpc}>
          <MenuList setMenu={setBurger} burger={burger} style={Style} />
        </div>

        <Lang setLang={setLang} />
        {user ? (
          <button onClick={setMenu} className={Style.header_ava}>
            {<img width={37} src={user.photoURL} alt="ava" />}
          </button>
        ) : (
          <button
            ref={signBtnRef}
            className={Style.header_signin}
            onClick={signIn}
          >
            <i
              style={{ marginRight: "10px" }}
              className="fa-solid fa-right-to-bracket"
            ></i>
            <b>{t("signin")}</b>
          </button>
        )}

        {userMenu && (
          <nav className={Style.header_user}>
            <ul>
              {admin && (
                <li>
                  <Link
                    onClick={() => setUserMenu((prev) => !prev)}
                    to="/profile"
                  >
                    <button>
                      {t("profile")}
                      <i className="fa-solid fa-address-card"></i>
                    </button>
                  </Link>
                </li>
              )}
              <li>
                <button onClick={signOut}>
                  {t("exit")}
                  <i className="fa-solid fa-door-open"></i>
                </button>
              </li>
            </ul>
          </nav>
        )}
      </header>
      {lang && <LangAbsolute setLang={setLang} />}
      {login && !user && <Login setLogin={setLogin} btnRef={signBtnRef} />}
    </>
  );
};

export default Navbar;
