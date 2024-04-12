import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index/index.module.scss";
import "./styles/adapt/adapt.scss";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA81Hs23gytT5nrQqEUI0dzBb0Filiv_Nk",
  authDomain: "meets-94069.firebaseapp.com",
  projectId: "meets-94069",
  storageBucket: "meets-94069.appspot.com",
  messagingSenderId: "209288620846",
  appId: "1:209288620846:web:7a8c774bdd0528469528bf",
  measurementId: "G-SZV1L3K1KN"
};

const Context = createContext(null);
export default Context;
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getStorage(app);
export const db = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        firebaseConfig,
        auth,
        firestore,
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>
);
