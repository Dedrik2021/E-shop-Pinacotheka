import { lazy } from "react";

const MainLayout = lazy(() => import('./layouts/MainLayout'));
const Home = lazy(() => import('./HomePage'));
const Authors = lazy(() => import('./AuthorsPage/AuthorsPage'));
const AboutAuthor = lazy(() => import('./AboutAuthorPage/AboutAuthorPage'));
const UserAccount = lazy(() => import('./UserAccountPage/UserAccountPage'));
const SinglePainting = lazy(() => import('./SinglePaintingPage/SinglePaintingPage'));


const ForgottenPassword = lazy(() => import('./ForgottenPasswordPage/ForgottenPasswordPage'));
const Error404 = lazy(() => import('./Error404Page/Error404Page'));

export {
    MainLayout,
    Home,
    Authors,
    Error404,
    AboutAuthor,
    UserAccount,
    ForgottenPassword,
    SinglePainting
}