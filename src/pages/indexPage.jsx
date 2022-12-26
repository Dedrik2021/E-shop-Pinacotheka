import { lazy } from "react";

const MainLayout = lazy(() => import('./layouts/MainLayout'));
const Home = lazy(() => import('./HomePage'));
const Authors = lazy(() => import('./AuthorsPage/AuthorsPage'));
const Error404 = lazy(() => import('./Error404Page/Error404Page'));

export {
    MainLayout,
    Home,
    Authors,
    Error404
}