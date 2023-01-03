import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';

import { createRef } from 'react';

import {
	MainLayout,
	Home,
	Authors,
	AboutAuthor,
	Error404,
	UserAccount,
	ForgottenPassword,
	SinglePainting,
	News,
	SingleNews,
} from '../../pages/indexPage';

import './app.scss';
import '../../scss/style.scss';

const routes = [
	{
		path: '',
		element: <Home />,
		nodeRef: createRef(),
	},
	{
		path: '/Authors',
		element: <Authors />,
		nodeRef: createRef(),
	},
	{
		path: '/Authors/AuthorInfo/:id',
		element: <AboutAuthor />,
		nodeRef: createRef(),
	},
	{
		path: '/PersonalOffice',
		element: <UserAccount />,
		nodeRef: createRef(),
	},
	{
		path: '/SinglePainting/:id',
		element: <SinglePainting />,
		nodeRef: createRef(),
	},
	{
		path: '/News',
		element: <News />,
		nodeRef: createRef(),
	},
	{
		path: '/News/SingleNews/:id',
		element: <SingleNews />,
		nodeRef: createRef(),
	},
	{
		path: '/ForgottenPassword',
		element: <ForgottenPassword />,
		nodeRef: createRef(),
	},
	{
		path: '*',
		element: <Error404 />,
		nodeRef: createRef(),
	},
];

const App = () => {
	return (
		<Router>
			<Suspense>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						{routes.map((route) => {
							return (
								<Route key={route.path} path={route.path} element={route.element} />
							);
						})}
					</Route>
				</Routes>
			</Suspense>
		</Router>
	);
};

export default App;
