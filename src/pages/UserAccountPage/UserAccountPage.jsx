import { useEffect, useState, useTransition } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import UserAccountInfo from './UserAccountInfo/UserAccountInfo';

import { setBreadCrumbsTitle } from '../../redux/slices/breadCrumbsSlice';
import { setAboutAuthorSwitchContentBtn } from '../../redux/modules/authors/authorsSlice';

import './userAccountPage.scss'

const UserAccount = () => {
	const dispatch = useDispatch();

	const { authorsData, authorsDataStatus, aboutAuthorSwitchContentBtn } = useSelector(
		(state) => state.authorsSlice,
	);
	const switchLanguageBtn = useSelector((state) => state.langBtnsSlice.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;

	const officeBtns = [
		{ id: 0, title: switchBtn ? 'Indentität der Person' : 'Personal Office' },
		{ id: 1, title: switchBtn ? 'Korb' : 'My Cart' },
		{ id: 2, title: switchBtn ? 'Bewertungen' : 'I Like It' },
		{ id: 3, title: 'Chat' },
	];

	useEffect(() => {
		dispatch(setBreadCrumbsTitle(''));
		const pathName = window.location.pathname.substring(1, 20);
		const name = pathName.split('/');
		dispatch(setBreadCrumbsTitle(name));
	}, [dispatch]);

	const clickOnAuthorInfoBtn = (id) => {
		dispatch(setAboutAuthorSwitchContentBtn(id));
	};

	const showContent = () => {
		switch (aboutAuthorSwitchContentBtn) {
			case 0:
				return <UserAccountInfo/>
			case 1:
				return 2
			case 2:
				return (
					3
				);
			case 3:
				return (
					4
				);
			default:
				return 1
		}
	};

	return (
		<div className="container">
			<BreadCrumbs />
			<div className="user-account">
				<div className="user-account__inner">
					<div className="user-account__aside">
						<ul className="btns">
							{officeBtns.map(({ id, title }) => {
								return (
									<li className="btns__item" key={id}>
										<button
											className={`btns__btn btn btn--red btn--universal ${
												aboutAuthorSwitchContentBtn === id
													? 'btn--active'
													: ''
											}`}
											type="button"
											onClick={() => clickOnAuthorInfoBtn(id)}
										>
											{title}
										</button>
									</li>
								);
							})}
						</ul>
					</div>
					<div className="user-account__info">{showContent()}</div>
				</div>
			</div>
		</div>
	);
};

export default UserAccount;
