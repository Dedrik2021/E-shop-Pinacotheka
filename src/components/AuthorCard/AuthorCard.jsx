import { memo, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { useSelector } from 'react-redux';

import AuthorCardContent from './AuthorCardContent/AuthorCardContent';

import unknowImg from '../../assets/images/unknow-photo.png';

import './authorCard.scss';

const AuthorCard = memo(({ item, switchBtn, foundUser }) => {
	const auth = getAuth();
	const user = auth.currentUser;

	const breadCrumbsTitle = useSelector((state) => state.breadCrumbsSlice.breadCrumbsTitle);

	useEffect(() => {
		window.scroll(0, 0);
	}, []);

	return (
		<AuthorCardContent
			switchBtn={switchBtn}
			item={item}
			unknowImg={unknowImg}
			foundUser={foundUser}
			user={user}
			breadCrumbsTitle={breadCrumbsTitle[0]}
		/>
	);
});

export default AuthorCard;
