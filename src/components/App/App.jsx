import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense, createRef, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { fetchUsersData } from '../../redux/modules/users/usersThunks';
import { fetchAuthorsData } from '../../redux/modules/authors/authorsThunks';
import {fetchNewsData} from '../../redux/modules/news/newsThunks'
import { setFoundUser } from '../../redux/modules/users/usersSlice';

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
	const dispatch = useDispatch()
	const auth = getAuth()
	const user = auth.currentUser
	const [allData, setAllData] = useState([])

	const {authorsData} = useSelector(state => state.authorsSlice)
	const {usersData} = useSelector(state => state.usersSlice)

	useMemo(() => {
		onAuthStateChanged(auth, (snapshot) => {
			if (snapshot) {
				setTimeout(() => {
					dispatch(fetchAuthorsData());
					dispatch(fetchNewsData());
					dispatch(fetchUsersData());
				}, 0)
			} else {
				dispatch(fetchAuthorsData());
				dispatch(fetchNewsData());
				dispatch(fetchUsersData());
			}
		});
	}, [auth, dispatch]);
	
	useMemo(() => {
		setAllData([...authorsData, ...usersData])
	}, [authorsData, usersData])

	const getFoundUser = () => {
		const foundUser = user &&
			allData.find(item => item.emailId === user.email)
			return foundUser
	}

	useEffect(() => {
		dispatch(setFoundUser(getFoundUser()))
	}, [dispatch, getFoundUser()])

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
