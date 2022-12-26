import { memo, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { useSelector } from 'react-redux';

import AuthorCardHomePage from './AuthorCardHomePage/AuthorCardHomePage';
import AuthorCardAuthorsPage from './AuthorCardAuthorsPage/AuthorCardAuthorsPage';

import unknowImg from '../../assets/images/unknow-photo.png';

import './authorCard.scss';

const AuthorCard = memo(({ item, switchBtn, foundUser }) => {
	const auth = getAuth();
	const user = auth.currentUser;

	const breadCrumbsTitle = useSelector((state) => state.breadCrumbsSlice.breadCrumbsTitle);

	useEffect(() => {
		window.scroll(0, 0);
	}, []);

	return breadCrumbsTitle[0] === 'Authors' ? (
		<AuthorCardAuthorsPage 
			switchBtn={switchBtn} 
			item={item} 
			unknowImg={unknowImg} 

		/>
	) : (
		<AuthorCardHomePage
			item={item}
			switchBtn={switchBtn}
			foundUser={foundUser}
			user={user}
			unknowImg={unknowImg}
		/>
	);
});

export default AuthorCard;
