import { memo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore/lite';
import { Link } from 'react-router-dom';

import { database } from '../../firebase/firebaseConfig';

import unknowImg from '../../assets/images/unknow-photo.png'
import UserIcon from '../../assets/sprite//user-icon.svg';

import './userOffice.scss'

const UserOffice = memo((props) => {
	const { logOut, findUser, userOfficeDropdownRefs, openLogout, setUserOfficeDropdown } = props;

	const dispatch = useDispatch();
	const linkRefs = useRef([]);

	const userOfficeDropdown = useSelector((state) => state.usersSlice.userOfficeDropdown);
	const switchLanguageBtn = useSelector((state) => state.langBtnsSlice.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;

	const userLinks = [
		{
			id: 0,
			title: switchBtn ? 'Personliches Buro' : 'Personal Office',
			path: switchBtn ? '/PersonlichesBuro' : '/PersonalOffice',
		},
		{
			id: 1,
			title: switchBtn ? 'Was dir gefallt:' : 'What you like:',
			path: switchBtn ? '/DieIhnenGefallen' : '/WhatYouLike',
			countItems: findUser && findUser.likeMe.length > 0 ? findUser.likeMe.length : 0,
		},
		{
			id: 2,
			title: switchBtn ? 'Korb:' : 'Cart:',
			path: switchBtn ? '/Korb' : '/Cart',
			countItems: findUser && findUser.cart.length > 0 ? findUser.cart.length : 0,
		},
	];

	const authorLinks = [
		{
			id: 0,
			title: switchBtn ? 'Personliches Buro' : 'Personal Office',
			path: `${switchBtn ? '/Autor/' : '/Author/'}${findUser ? findUser.id : null}`,
		},
		{
			id: 1,
			title: switchBtn ? 'Was dir gefallt:' : 'What you like:',
			path: switchBtn ? '/DieIhnenGefallen' : '/WhatYouLike',
			countItems: findUser && findUser.likeMe.length > 0 ? findUser.likeMe.length : 0,
		},
		{
			id: 2,
			title: switchBtn ? 'Korb:' : 'Cart:',
			path: switchBtn ? '/Korb' : '/Cart',
			countItems: findUser && findUser.cart.length > 0 ? findUser.cart.length : 0,
		},
	];

	const onUserLink = (userInfo) => {
		const docToUpdate = doc(database, 'showUserInfo', 'IezwG0ZPPzWGDNIxTiUI');
		updateDoc(docToUpdate, {
			user: userInfo,
		}).catch((err) => {
			alert(err.message);
		});
	};

	const focusOnLink = (id) => {
		linkRefs.current.forEach((item) => item.classList.remove('active'));
		linkRefs.current[id].classList.add('active');
		linkRefs.current[id].focus();
	};

	const getDate = () => {
		const date = new Date().getHours();

		switch (date) {
			case 6:
				return switchBtn ? 'Guten Morgen' : 'Good morning';
			case 7:
				return switchBtn ? 'Guten Morgen' : 'Good morning';
			case 8:
				return switchBtn ? 'Guten Morgen' : 'Good morning';
			case 9:
				return switchBtn ? 'Guten Morgen' : 'Good morning';
			case 10:
				return switchBtn ? 'Guten Morgen' : 'Good morning';
			case 11:
				return switchBtn ? 'Guten Morgen' : 'Good morning';
			case 12:
				return switchBtn ? 'Guten Tag' : 'Good afternoon';
			case 13:
				return switchBtn ? 'Guten Tag' : 'Good afternoon';
			case 14:
				return switchBtn ? 'Guten Tag' : 'Good afternoon';
			case 15:
				return switchBtn ? 'Guten Tag' : 'Good afternoon';
			case 16:
				return switchBtn ? 'Guten Tag' : 'Good afternoon';
			case 17:
				return switchBtn ? 'Guten Tag' : 'Good afternoon';
			case 18:
				return switchBtn ? 'Guten Abend' : 'Good evening';
			case 19:
				return switchBtn ? 'Guten Abend' : 'Good evening';
			case 20:
				return switchBtn ? 'Guten Abend' : 'Good evening';
			case 21:
				return switchBtn ? 'Guten Abend' : 'Good evening';
			case 22:
				return switchBtn ? 'Guten Abend' : 'Good evening';
			case 23:
				return switchBtn ? 'Guten Abend' : 'Good evening';
			case 0:
				return switchBtn ? 'Gute Nacht' : 'Good night';
			case 1:
				return switchBtn ? 'Gute Nacht' : 'Good night';
			case 2:
				return switchBtn ? 'Gute Nacht' : 'Good night';
			case 3:
				return switchBtn ? 'Gute Nacht' : 'Good night';
			case 4:
				return switchBtn ? 'Gute Nacht' : 'Good night';
			case 5:
				return switchBtn ? 'Gute Nacht' : 'Good night';
			default:
				return switchBtn ? 'Guten Tag' : 'Good afternoon';
		}
	};

	const clickOnLink = (id) => {
		dispatch(setUserOfficeDropdown(!userOfficeDropdown));
		focusOnLink(id);
		onUserLink(findUser);
	};

	return (
		<div className="user" ref={userOfficeDropdownRefs}>
			<img
				className="user__img"
				src={findUser && findUser.image ? findUser.image : unknowImg}
				alt={findUser && findUser.title}
			/>
			<button
				className={`user__btn btn btn--red ${userOfficeDropdown ? 'active' : ''}`}
				type="button"
				onClick={() => dispatch(setUserOfficeDropdown(!userOfficeDropdown))}
			>
				Office
				<svg width="18" height="18">
					<use href={`${UserIcon}#user`}></use>
				</svg>
			</button>
			<div className={`user-dropdown ${userOfficeDropdown ? 'active' : ''}`}>
				<div className="user-dropdown__title">
					{getDate()}!<span className="user-dropdown__name">{findUser && findUser.title}</span>
				</div>
				<ul className="user__list">
					{findUser && findUser.user === 'authors'
						? authorLinks.map(({ id, title, path, countItems }) => {
								return (
									<li className="user__item" key={id}>
										<Link
											ref={(el) => (linkRefs.current[id] = el)}
											className={`user__link`}
											to={path}
											onClick={() => clickOnLink(id)}
										>
											{title} <span>{countItems}</span>
										</Link>
									</li>
								);
						  })
						: userLinks.map(({ id, title, path, countItems }) => {
								return (
									<li className="user__item" key={id}>
										<Link
											ref={(el) => (linkRefs.current[id] = el)}
											className={`user__link`}
											to={path}
											// state={{ changeUser: findUser }}
											onClick={() => clickOnLink(id)}
										>
											{title} <span>{countItems}</span>
										</Link>
									</li>
								);
						  })}
				</ul>
				<button
					className={`user__btn user__btn--logout btn btn--red ${openLogout ? 'active' : ''}`}
					type="button"
					onClick={logOut}
				>
					Log out
				</button>
			</div>
		</div>
	);
});

export default UserOffice;
