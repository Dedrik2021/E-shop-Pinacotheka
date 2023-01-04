import { useState, useRef, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { ref, onValue, update } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from 'firebase/auth';

import HeaderDropdown from './HeaderDropdown/HeaderDropdown';
import HeaderSwitchLangBtns from './HeaderSwitchLangBtns/HeaderSwitchLangBtns';
import HeaderSearchForm from './HeaderSearchForm/HeaderSearchForm';
import HeaderSearchList from './HeaderSearchList/HeaderSearchList';
import HeaderOpenModalBtn from './HeaderOpenModalBtn/HeaderOpenModalBtn';
import UserOffice from '../UserOffice/UserOffice';

import { realDb } from '../../firebase/firebaseConfig';

import { setSwitchLanguageBtn } from '../../redux/slices/langBtnsSlice';
import { setUserOfficeDropdown } from '../../redux/modules/users/usersSlice';
import { searchData } from '../../services/data/searchData';
import { setAboutAuthorSwitchContentBtn } from '../../redux/modules/authors/authorsSlice';

import Logo from '../../UI/logo/Logo';
import UserAuthSkeleton from '../../skeletons/userAuthSkeleton';
import { Status } from '../../utils/status/status';

import logo from '../../assets/images/logo.svg';

import '../Header/header.scss';

const Header = memo(({ clickOpenLogout, openLogout }) => {
	const auth = getAuth();
	const user = auth.currentUser;
	const dispatch = useDispatch();

	const menuInnerRefs = useRef();
	const inputRefs = useRef();
	const formRefs = useRef();
	const dropdownRefs = useRef();
	const burgerBtnRefs = useRef();
	const userOfficeDropdownRefs = useRef();

	const [search, setSearch] = useState(false);
	const [searchInput, setSearchInput] = useState({ val: '', isValid: true });
	const [dropdown, setDropdown] = useState(false);
	const [openMenu, setOpenMenu] = useState(false);
	const [scroll, setScroll] = useState(false)

	const authorsData = useSelector((state) => state.authorsSlice.authorsData);
	const newsData = useSelector((state) => state.newsSlice.newsData);
	const { usersData, usersDataStatus, foundUser } = useSelector((state) => state.usersSlice);

	const switchLanguageBtn = useSelector((state) => state.langBtnsSlice.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;
	const allData = [...authorsData, ...newsData];

	const menuBtns = [
		{
			id: 0,
			name: switchBtn ? 'Autoren' : 'Authors',
			href: switchBtn ? '/Autoren' : '/Authors',
		},
		{
			id: 1,
			name: switchBtn ? 'Arbeitsplan' : 'Work schedule',
			href: switchBtn ? '/Arbeitsplan' : '/WorkSchedule',
		},
	];

	useEffect(() => {
		onValue(ref(realDb, 'switchLanguageBtn'), (snapshot) => {
			if (snapshot.exists()) {
				dispatch(setSwitchLanguageBtn(Object.values(snapshot.val())));
			}
		});
	}, [dispatch]);

	useEffect(() => {
		const checkScroll = () => {
			let scrollPos = window.scrollY;
			if (scrollPos > 0) {
				setScroll(true);
				setDropdown(false);
				setOpenMenu(false)
				dispatch(setUserOfficeDropdown(false))
			} else {
				setScroll(false);
			}
		};
		document.addEventListener('scroll', checkScroll);
	}, [dispatch]);

	useEffect(() => {
		const closeSearch = (e) => {
			if (!e.path.includes(formRefs.current)) {
				setSearch(false);
				setSearchInput({ val: '', isValid: true });
			}
		};
		document.body.addEventListener('click', closeSearch);
		return () => document.removeEventListener('click', closeSearch);
	}, []);

	useEffect(() => {
		const closeUserOfficeDropdown = (e) => {
			if (!e.path.includes(userOfficeDropdownRefs.current)) {
				dispatch(setUserOfficeDropdown(false));
			}
		};
		document.body.addEventListener('click', closeUserOfficeDropdown);
		return () => document.removeEventListener('click', closeUserOfficeDropdown);
	}, [dispatch]);

	useEffect(() => {
		const closeMenu = (e) => {
			if (
				!e.path.includes(menuInnerRefs.current) &&
				!e.path.includes(burgerBtnRefs.current)
			) {
				setOpenMenu(false);
			} else if (e.path.includes(menuInnerRefs.current)) {
				setOpenMenu(true);
			}
		};
		document.body.addEventListener('click', closeMenu);
		return () => document.removeEventListener('click', closeMenu);
	}, []);

	useEffect(() => {
		const closeDropdown = (e) => {
			if (!e.path.includes(dropdownRefs.current)) {
				setDropdown(false);
			}
		};
		document.body.addEventListener('click', closeDropdown);
		return () => document.removeEventListener('click', closeDropdown);
	}, []);

	const clickSearchOpen = () => {
		setSearch(!search);
		setDropdown(false);
		if (!search) {
			inputRefs.current.focus();
		} else {
			inputRefs.current.blur();
			setSearchInput({ val: '', isValid: true });
		}
	};

	const clickLanguageBtn = (id) => {
		const docToUpdates = ref(realDb, `switchLanguageBtn`);
		update(docToUpdates, {
			ID: id,
		}).catch((err) => {
			alert(err.message);
		});
	};

	const clickOnBurgerBtn = () => {
		setOpenMenu(!openMenu);
	};

	const clearSearchInput = () => {
		setSearch(false)
		setSearchInput({val: '', isValid: true})
		dispatch(setAboutAuthorSwitchContentBtn(0))
	}

	// console.log(foundUser);

	const changeAuth = () => {
		if (user !== null) {
			const userContent =
				usersDataStatus === Status.LOADING || usersDataStatus === Status.ERROR ? (
					<UserAuthSkeleton />
				) : (
					<UserOffice
						logOut={clickOpenLogout}
						findUser={foundUser}
						userOfficeDropdownRefs={userOfficeDropdownRefs}
						switchBtn={switchBtn}
						openLogout={openLogout}
						setUserOfficeDropdown={setUserOfficeDropdown}
					/>
				);
			return userContent;
		} else {
			return usersDataStatus === Status.LOADING || usersDataStatus === Status.ERROR ? (
				<UserAuthSkeleton />
			) : (
				<HeaderOpenModalBtn />
			);
		}
	};

	const searchFormProps = {
		search,
		searchInput,
		switchBtn,
		clickSearchOpen,
		setSearchInput,
		inputRefs,
		formRefs,
		setSearch,
	};
	const filteredBySearch = searchData(searchInput, allData);

	return (
		<header className={`header ${scroll ? 'sticky' : ''}`}>
			<div className="container">
				<nav className={`menu`}>
					<Link className="logo header__logo" to={'/'}>
						<Logo img={logo} width={'180'} height={'50'} />
					</Link>
					<button
						className={`menu__burger btn ${openMenu ? 'active' : ''}`}
						type="button"
						onClick={clickOnBurgerBtn}
						ref={burgerBtnRefs}
					>
						<span className="sr-only">
							{switchBtn ? 'Öffne das Menü' : 'Open the menu'}
						</span>
						<span></span>
					</button>
					<div className={`menu__inner ${openMenu ? 'active' : ''}`} ref={menuInnerRefs}>
						<HeaderSearchForm searchFormProps={searchFormProps} />
						<HeaderSearchList
							searchInput={searchInput}
							filteredBySearch={filteredBySearch}
							clearSearchInput={clearSearchInput}
						/>
						<ul className="menu__list" ref={dropdownRefs}>
							<li
								className={`menu__item menu__item--dropdown 
								${dropdown ? 'active' : ''}`}
								onClick={() => setDropdown(true)}
							>
								<button className={`menu__link `} type="button">
									{switchBtn ? 'Katalog' : 'Catalog'}
								</button>
								<span className="menu__border-bottom"></span>
								<HeaderDropdown />
							</li>
							{menuBtns.map(({ id, name, href }) => (
								<li key={id} className="menu__item">
									<Link className="menu__link" to={href}>
										{name}
									</Link>
									<span className="menu__border-bottom"></span>
								</li>
							))}
						</ul>
					</div>
					<div className={`menu__box `}>
						<HeaderSwitchLangBtns changeLang={clickLanguageBtn} />

						{changeAuth()}
					</div>
				</nav>
			</div>
		</header>
	);
});

export default Header;
