import { lazy } from "react";

const MainLayout = lazy(() => import('./layouts/MainLayout'));
const Home = lazy(() => import('./HomePage'));

export {
    MainLayout,
    Home
}