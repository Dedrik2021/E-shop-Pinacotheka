import { lazy } from "react";

const MainLayout = lazy(() => import('./layouts/MainLayout'));
const Home = lazy(() => import('./HomePage'));
const Authors = lazy(() => import('./AuthorsPage/AuthorsPage'));

export {
    MainLayout,
    Home,
    Authors
}