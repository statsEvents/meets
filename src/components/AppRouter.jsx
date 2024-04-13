import { Route, Routes, Navigate } from "react-router-dom";
import React, { lazy, memo, Suspense } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "..";
import ErrorBoundary from "./ErrorBounds/ErrorBoundary";
const Preloader = lazy(() => import("./Preloaders/Preloader")),
  Menu = lazy(() => import("../main/home/Home")),
  // Cron = lazy(() => import("../api/cron")),
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
    // {
    //   path: "/api/cron",
    //   Component: Cron,
    // },
    {
      path: "/about",
      Component: Menu,
    },
  ];

const AppRouter = memo(() => {
  const [user] = useAuthState(auth);
  return user ? (
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
