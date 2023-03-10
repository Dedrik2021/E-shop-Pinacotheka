import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import AuthorsBio from './AuthorsBio/AuthorsBio';
import AboutAuthorGallery from './AboutAuthorGallery/AboutAuthorGallery';
import AboutAuthorReviews from './AboutAuthorReviews/AboutAuthorReviews';


import ReviewsSkeleton from '../../skeletons/reviewsSkeleton';
import AuthorsBioSkeleton from '../../skeletons/autorsBioSkeleton';
import GallerySkeleton from '../../skeletons/gallerySkeleton';

import { setBreadCrumbsTitle } from '../../redux/slices/breadCrumbsSlice';
import {setAboutAuthorSwitchContentBtn} from '../../redux/modules/authors/authorsSlice'
import { Status } from '../../utils/status/status';

import './aboutAuthorPage.scss'

const AboutAuthorPage = () => {
	
	const { id } = useParams();
	const dispatch = useDispatch();
	const auth = getAuth();

	const [dataSelected, setDataSelected] = useState(1);
	const [dataLength, setDataLength] = useState(0);
	const [dataLimitLast, setDataLimitLast] = useState(16);
	const [dataLimitStart, setDataLimitStart] = useState(16);

	const [reviewsDataSelected, setReviewsDataSelected] = useState(1);
	const [reviewsDataLength, setReviewsDataLength] = useState(0);
	const [reviewsDataLimitLast, setReviewsDataLimitLast] = useState(10);
	const [reviewsDataLimitStart, setReviewsDataLimitStart] = useState(10);
	const [loading, setLoading] = useState(false);

	const { authorsData, authorsDataStatus, aboutAuthorSwitchContentBtn } = useSelector((state) => state.authorsSlice);
	const switchLanguageBtn = useSelector((state) => state.langBtnsSlice.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;

	const aboutBtn = [
		{ id: 0, title: switchBtn ? 'Indentität der Person' : 'Identity of the person' },
		{ id: 1, title: switchBtn ? 'Gemälde zum Verkauf' : 'Paintings for Sale' },
		{ id: 2, title: switchBtn ? 'Bewertungen' : 'Review' },
		{ id: 3, title: 'Chat' },
	];

	const foundAuthorsItems = () => {
		const foundAuthor = authorsData.find((author) => author.id === id);
		return { foundAuthor };
	};

	useMemo(() => {
		window.scroll(0, 0)
		setLoading(true);
		setDataLimitLast(16 * dataSelected);
		setDataLimitStart(dataLimitLast - 16);

		setReviewsDataLimitLast(10 * reviewsDataSelected);
		setReviewsDataLimitStart(reviewsDataLimitLast - 10);

		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, [dataLimitLast, dataSelected, reviewsDataLimitLast, reviewsDataSelected]);

	useEffect(() => {
		setDataLength(Math.ceil(foundAuthorsItems().foundAuthor && foundAuthorsItems().foundAuthor.works.length / 16));
		setReviewsDataLength(Math.ceil(foundAuthorsItems().foundAuthor && foundAuthorsItems().foundAuthor.feedBack.length / 10))
	}, [foundAuthorsItems().foundAuthor]);

	useEffect(() => {
		dispatch(setBreadCrumbsTitle(''));
		const pathName = window.location.pathname.substring(1, 19);
		const name = pathName.split('/');
		dispatch(setBreadCrumbsTitle(name));
	}, [dispatch]);

	useEffect(() => {
		window.scroll(0, 0)
	}, [])

	const clickOnAuthorInfoBtn = (id) => {
		dispatch(setAboutAuthorSwitchContentBtn(id))
		setDataSelected(1)
		setReviewsDataSelected(1)
	}

	const authorsBio = () => {
		if (loading || authorsDataStatus === Status.LOADING || authorsDataStatus === Status.ERROR) {
			return <AuthorsBioSkeleton />;
		} else {
			return (
				<AuthorsBio
				authorInfo={foundAuthorsItems().foundAuthor}
				switchBtn={switchBtn}
				setAboutAuthorSwitchContentBtn={setAboutAuthorSwitchContentBtn}
				dispatch={dispatch}
			/>
			)
		}
	};

	console.log(foundAuthorsItems().foundAuthor && foundAuthorsItems().foundAuthor.works.length);

	const authorsWorks = () => {
		if (loading || authorsDataStatus === Status.LOADING || authorsDataStatus === Status.ERROR) {
			return (
				<div className="container" style={{ paddingTop: '60px', marginBottom: '150px' }}>
					{[...new Array(foundAuthorsItems().foundAuthor && foundAuthorsItems().foundAuthor.works.length).slice(dataLimitStart, dataLimitLast)].map((_, i) => (
						<GallerySkeleton key={i} />
					))}
				</div>
			);
		} else {
			return (
				<AboutAuthorGallery
					switchBtn={switchBtn}
					setDataSelected={setDataSelected}
					setLimitLast={setDataLimitLast}
					limitLast={dataLimitLast}
					limitStart={dataLimitStart}
					dataSelected={dataSelected}
					dataLength={dataLength}
					paintings={ foundAuthorsItems().foundAuthor.works}
					author={foundAuthorsItems().foundAuthor}
					loading={loading}
				/>
			)
		}
	};

	const showContent = () => {
		switch (aboutAuthorSwitchContentBtn) {
			case 0:
				return authorsBio();
			case 1:
				return authorsWorks();
			case 2:
				return <AboutAuthorReviews 
					authorInfo={foundAuthorsItems().foundAuthor}
					switchBtn={switchBtn}
					authorsDataStatus={authorsDataStatus}
					setDataSelected={setReviewsDataSelected}
					setLimitLast={setReviewsDataLimitLast}
					limitLast={reviewsDataLimitLast}
					limitStart={reviewsDataLimitStart}
					dataSelected={reviewsDataSelected}
					dataLength={reviewsDataLength}
					loading={loading}
				/>
			case 3:
				return 3
				// <AuthorsChat authorInfo={authorInfo} />;
			default:
				return authorsBio();
		}
	};

	return (
		<div className="container">
			<BreadCrumbs />
			<div className={`about-author`}>
				<div className={`about-author__inner`}>
					<div className={`about-author__shadow`}></div>
					<div className="about-author__aside">
						<ul className="authors-items__list">
							{aboutBtn.map(({ id, title }) => {
								return (
									<li className="authors-items__item" key={id}>
										<button
											className={`authors-items__btn btn btn--red btn--universal ${
												aboutAuthorSwitchContentBtn === id ? 'btn--active' : ''
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
					{/* {showContent()} */}
					{showContent()}
				</div>
			</div>
		</div>
	);
};

export default AboutAuthorPage;
