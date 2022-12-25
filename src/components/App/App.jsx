import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';

import { MainLayout, Home, Authors } from '../../pages/indexPage';

import './app.scss';
import '../../scss/style.scss'

const App = () => {

	return (
		<Router>
			<Suspense>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						<Route path="" element={<Home />} />
						<Route path={'/Authors'} element={<Authors />} />
						{/* <Route
							path={`${switchBtn ? '/Autor/' : '/Author/'}:id`}
							element={<AboutAuthor />}
						/>
						<Route
							path={`${
								switchBtn ? '/Autor/Einzelmalerei' : '/Author/SinglePainting'
							}/:id`}
							element={<SinglePainting />}
						/>
						<Route path={switchBtn ? '/Nachrichten' : '/News'} element={<News />} />
						<Route path={switchBtn ? '/Korb' : '/Cart'} element={<UserCart />} />
						<Route
							path={switchBtn ? '/PersonlichesBuro' : '/PersonalOffice'}
							element={<UserAccount />}
						/>
						<Route
							path={switchBtn ? 'DieIhnenGefallen' : '/WhatYouLike'}
							element={<UserLikes />}
						/>
						<Route
							path={switchBtn ? '/PasswortVergessen' : 'ForgotYourPassword'}
							element={<ForgottenPassword />}
						/>
						<Route
							path={`${switchBtn ? '/Nachrichten/Nachricht/' : '/News/Newses/'}:id`}
							element={<SingleNews />}
						/>
						<Route
							path={`${
								switchBtn ? '/Nachrichten/NachrichtenErstellen' : '/News/CreateNews'
							}`}
							element={<CreateNews />}
						/>
						<Route
							path={`${
								switchBtn
									? '/Nachrichten/NeuigkeitenBearbeiten/'
									: '/News/EditNews/'
							}:id`}
							element={<EditNews />}
						/>
						<Route
							path={`${
								switchBtn
									? '/BenutzerinformationenUberprufen/'
									: '/ReviewUserInformation/'
							}:id`}
							element={<ReviewUserInfo />}
						/>
						<Route path="*" element={<Error404 />} /> */}
					</Route>
				</Routes>
			</Suspense>
		</Router>
	);
};

export default App;
