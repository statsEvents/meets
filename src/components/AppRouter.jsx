import { Route, Routes, Navigate } from "react-router-dom";
import React, { lazy, memo, Suspense, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "..";
import { doc, getDoc } from "firebase/firestore";
import ErrorBoundary from "./ErrorBounds/ErrorBoundary";
const Preloader = lazy(() => import("./Preloaders/Preloader")),
  Menu = lazy(() => import("../main/home/Home")),
  MenuID = lazy(() => import("../main/home/HomeID")),
  About = lazy(() => import("../main/about/About")),
  Profile = lazy(() => import("../main/profile/Profile")),
  privatRoutes = [
    {
      path: "/profile",
      Component: Profile,
    },
  ],
  publicRoutes = [
    {
      path: "/",
      Component: Menu,
    },
    {
      path: "/:id",
      Component: MenuID,
    },
    {
      path: "/about",
      Component: About,
    },
  ];

const AppRouter = memo(() => {
  const [user] = useAuthState(auth);
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

  return user && admin ? (
    <Routes>
      {privatRoutes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={<Preloader />}>
              <ErrorBoundary>
                <Component />
              </ErrorBoundary>
            </Suspense>
          }
        />
      ))}
      {publicRoutes &&
        publicRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<Preloader />}>
                <ErrorBoundary>
                  <Component />
                </ErrorBoundary>
              </Suspense>
            }
          />
        ))}
      <Route path="*" element={<Navigate to={"/"} replace />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes &&
        publicRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<Preloader />}>
                <ErrorBoundary>
                  <Component />
                </ErrorBoundary>
              </Suspense>
            }
          />
        ))}
      <Route path="*" element={<Navigate to={"/"} replace />} />
    </Routes>
  );
});

export default AppRouter;
