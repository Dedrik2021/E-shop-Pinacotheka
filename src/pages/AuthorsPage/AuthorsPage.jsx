import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from 'react-helmet';

import AuthorsSearch from '../../components/AuthorsSearch/AuthorsSearch';
import AuthorCard from '../../components/AuthorCard/AuthorCard';
import Pagination from '../../components/Pagination/Pagination';

import AuthorsSkeleton from '../../skeletons/authorsSkeleton';
import { searchData } from '../../services/data/searchData';

import { Status } from '../../utils/status/status';

import './authorsPage.scss';
// import { changeSinglePainting, fetchAuthorsItems } from '../../redux/slices/authorsInfosSlice';
// import AuthorsList from '../components/AuthorsList';
// import ShowMorePagination from '../components/ShowMorePagination';
// import { setBreadCrumbs } from '../../redux/slices/breadCrumbsSlice';
// import BreadCrumbs from '../components/BreadCrumbs';
// import AuthorsSkeleton from '../../skeletons/authorsSkeleton';

const AuthorsPage = () => {
	const [authorsSearchInput, setAuthorsSearchInput] = useState({ val: '', isValid: true });
	const [loading, setLoading] = useState(false);
	const [authorsDataLength, setAuthorsDataLength] = useState(0);
	const [limitLast, setLimitLast] = useState(12);
	const [limitStart, setLimitStart] = useState(12);
	const [dataSelected, setDataSelected] = useState(1);

	const { authorsData, authorsDataStatus } = useSelector((state) => state.authorsSlice);
	const foundUser = useSelector((state) => state.usersSlice.foundUser);
	const switchLanguageBtn = useSelector((state) => state.langBtnsSlice.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;

	const filteredBySearch = searchData(authorsSearchInput, authorsData).slice(limitStart, limitLast);

	useMemo(() => {
		setLoading(true);
		setLimitLast(12 * dataSelected);
		setLimitStart(limitLast - 12);
		setTimeout(() => {
			setLoading(false);
		}, 500);
	}, [dataSelected, limitLast]);

	useEffect(() => {
		setAuthorsDataLength(Math.ceil(authorsData.length / 12));
	}, [authorsData]);

	// useEffect(() => {
	// 	dispatch(setBreadCrumbs(''));
	// 	const pathName = window.location.pathname.substring(1, 8);
	// 	const name = pathName.split('/');
	// 	dispatch(setBreadCrumbs(name));
	// }, []);

	const searchAuthors = (e) => {
		setAuthorsDataLength(Math.ceil(filteredBySearch.length / 12))
		setLoading(true);
		setAuthorsSearchInput({ val: e.target.value, isValid: true });
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	};

	const cleanSearchInput = () => {
		setAuthorsSearchInput({val: '', isValid: true})
		setAuthorsDataLength(Math.ceil(authorsData.length / 12))
	}

	const getContent = () => {
		if (authorsDataStatus === Status.LOADING || authorsDataStatus === Status.ERROR) {
			return (
				<div className="container" style={{ padding: '0' }}>
					{[...new Array(12)].map((_, i) => (
						<AuthorsSkeleton key={i} />
					))}
				</div>
			);
		} else {
			return contentLoaded();
		}
	};

	const contentLoaded = () => {
		if (!loading && filteredBySearch.length > 0) {
			return (
				<ul 
					className="authors__list"
					style={{marginBottom: authorsDataLength > 1 && '70px', height: filteredBySearch.length < 7 && '500px'}}
					>
					{filteredBySearch.map((item, i) => {
						return (
							<AuthorCard
								key={i}
								item={item}
								switchBtn={switchBtn}
								foundUser={foundUser}
							/>
						);
					})}
				</ul>
			);
		} else if (filteredBySearch.length === 0) {
			if (!loading) {
				return (
					<div className="authors__empty">
						<h2>NO DATA</h2>
					</div>
				);
			} else {
				return (
					<div className="container" style={{ padding: '0' }}>
						{[...new Array(8)].map((_, i) => (
							<AuthorsSkeleton key={i} />
						))}
					</div>
				);
			}
		} else {
			return (
				<div className="container" style={{ padding: '0', height: filteredBySearch.length < 7 && '800px', marginBottom: '50px' }}>
					{[...new Array(filteredBySearch.length)].map((_, i) => (
						<AuthorsSkeleton key={i} />
					))}
				</div>
			);
		}
	};

	const onCurrentPage = (data) => {
		let currentPage = data.selected + 1;
		setDataSelected(currentPage);

		if (data.isNext) {
			setLimitLast(limitLast + 12);
		} else if (data.isPrevious) {
			setLimitLast(limitLast - 12);
		}
	};

	return (
		<>
			<Helmet>
				<meta name="description" content={switchBtn ? 'Autoren' : 'Authors'} />
				<title>{switchBtn ? 'Autoren' : 'Authors'}</title>
			</Helmet>

			<section className="authors">
				<div className="container">
					{/* <BreadCrumbs /> */}
					<div className="authors__top">
						<h1 className="authors__title title">
							{switchBtn ? 'Autoren' : 'Authors'}
						</h1>
						<div className="authors__box">
							<span className="authors__found">
								{authorsData.length}

								{switchBtn ? ' Autoren gefunden' : ' Authors found'}
							</span>
							<AuthorsSearch
								switchBtn={switchBtn}
								authorsSearchInput={authorsSearchInput}
								searchAuthors={searchAuthors}
								setAuthorsSearchInput={setAuthorsSearchInput}
								cleanSearchInput={cleanSearchInput}
							/>
						</div>
					</div>
					{getContent()}
					{authorsDataLength > 1 && (
						<Pagination
						pageChange={onCurrentPage}
						pageCount={authorsDataLength}
						dataSelected={dataSelected}
					/>
					)}
				</div>
			</section>
		</>
	);
};

export default AuthorsPage;
