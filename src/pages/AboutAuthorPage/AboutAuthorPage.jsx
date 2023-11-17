import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { doc, arrayRemove, updateDoc, arrayUnion } from 'firebase/firestore/lite';

import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import AuthorsBio from './AuthorsBio/AuthorsBio';
import AboutAuthorGallery from './AboutAuthorGallery/AboutAuthorGallery';
import AboutAuthorReviews from './AboutAuthorReviews/AboutAuthorReviews';
import AboutAuthorChat from './AboutAuthorChat/AboutAuthorChat';

import ReviewsSkeleton from '../../skeletons/reviewsSkeleton';
import AuthorsBioSkeleton from '../../skeletons/autorsBioSkeleton';
import GallerySkeleton from '../../skeletons/gallerySkeleton';

import { setBreadCrumbsTitle } from '../../redux/slices/breadCrumbsSlice';
import { setAboutAuthorSwitchContentBtn } from '../../redux/modules/authors/authorsSlice';
import { Status } from '../../utils/status/status';
import { fetchAuthorsData } from '../../redux/modules/authors/authorsThunks';
import { database } from '../../firebase/firebaseConfig';

import './aboutAuthorPage.scss';

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
	const [reviewsDataLimitLast, setReviewsDataLimitLast] = useState(20);
	const [reviewsDataLimitStart, setReviewsDataLimitStart] = useState(20);
	const [loading, setLoading] = useState(false);
	const [foundedAuthor, setFoundedAuthor] = useState([]);
	const [messages, setMessages] = useState([]);
	const [reviews, setReviews] = useState([]);

	const { authorsData, authorsDataStatus, aboutAuthorSwitchContentBtn } = useSelector(
		(state) => state.authorsSlice,
	);

	const { foundUser, usersDataStatus } = useSelector((state) => state.usersSlice);

	const switchLanguageBtn = useSelector((state) => state.langBtnsSlice.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;

	const aboutBtn = [
		{ id: 0, title: switchBtn ? 'Indentität der Person' : 'Identity of the person' },
		{ id: 1, title: switchBtn ? 'Gemälde zum Verkauf' : 'Paintings for Sale' },
		{ id: 2, title: switchBtn ? 'Bewertungen' : 'Reviews' },
		{ id: 3, title: 'Chat' },
	];

	useEffect(() => {
		setReviews(foundedAuthor !== undefined ? foundedAuthor.feedBack : []);
		setMessages(foundedAuthor !== undefined && foundUser && foundedAuthor.chat.filter((message) => message.chatId === foundUser.ID + foundedAuthor.ID));
	}, [foundUser, foundedAuthor]);


	useMemo(() => {
		setFoundedAuthor(() => authorsData.find((author) => author.id === id));
	}, [authorsData, id]);

	const foundAuthorsItems = useCallback(() => {
		const foundAuthor = authorsData && authorsData.find((author) => author.id === id);
		return { foundAuthor };
	}, [authorsData, id]);

	useMemo(() => {
		window.scroll(0, 0);
		setLoading(true);
		setDataLimitLast(16 * dataSelected);
		setDataLimitStart(dataLimitLast - 16);

		setReviewsDataLimitLast(20 * reviewsDataSelected);
		setReviewsDataLimitStart(reviewsDataLimitLast - 20);

		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, [dataLimitLast, dataSelected, reviewsDataLimitLast, reviewsDataSelected]);

	useEffect(() => {
		setDataLength(
			foundAuthorsItems().foundAuthor !== undefined ?
				Math.ceil(foundAuthorsItems().foundAuthor.works.length / 16) : 1,
		);
		setReviewsDataLength(
			foundAuthorsItems().foundAuthor !== undefined ?
				Math.ceil(foundAuthorsItems().foundAuthor.feedBack.length / 20) : 1,
		);
	}, [foundAuthorsItems]);

	useEffect(() => {
		dispatch(setBreadCrumbsTitle(''));
		const pathName = window.location.pathname.substring(1, 19);
		const name = pathName.split('/');
		dispatch(setBreadCrumbsTitle(name));
	}, [dispatch]);

	useEffect(() => {
		window.scroll(0, 0);
		if (aboutAuthorSwitchContentBtn === 2 || aboutAuthorSwitchContentBtn === 3) {
			dispatch(fetchAuthorsData());
		} 
	}, [aboutAuthorSwitchContentBtn, dispatch]);

	const clickOnAuthorInfoBtn = (id) => {
		setLoading(true)
		dispatch(setAboutAuthorSwitchContentBtn(id));
		setDataSelected(1);
		setReviewsDataSelected(1);
		setLoading(false)
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
			);
		}
	};

	const onDeleteMessage = (id) => {
		setLoading(true)
		console.log(id);
		const collectionReff = doc(database, 'authors', foundedAuthor.ID);
		const docToDelete = foundedAuthor.feedBack.find((item) => item.id === id);

		const collectionChatReff = doc(database, 'authors', foundedAuthor.ID);
		const docToDeleteMessage = foundedAuthor.chat.find((item) => item.id === id);

		const collectionUserReff = doc(database, foundUser && foundUser.user === 'author' ? 'authors' : 'users', foundUser.ID);
		const docToDeleteUserMessage = foundUser.chat.find((item) => item.id === id);
		
		setMessages((message) => message.filter((item) => item.id !== id))
		setReviews((review) => review.filter((item) => item.id !== id))

		if (window.confirm('Do you want to delite this message? Are you sure?')) {
			if (aboutAuthorSwitchContentBtn === 3) {
				updateDoc(collectionChatReff, {
					chat: arrayRemove(docToDeleteMessage),
				});
	
				updateDoc(collectionUserReff, {
					chat: arrayRemove(docToDeleteUserMessage),
				});
			} else {
				updateDoc(collectionReff, {
					feedBack: arrayRemove(docToDelete),
				});
			}

			setTimeout(() => {
				setLoading(false)
			}, 100);
		}
	};

	const authorsWorks = () => {
		if (loading || authorsDataStatus === Status.LOADING || authorsDataStatus === Status.ERROR) {
			return (
				<div className="container" style={{ paddingTop: '60px', marginBottom: '150px' }}>
					{[
						...new Array(
							foundAuthorsItems().foundAuthor &&
								foundAuthorsItems().foundAuthor.works.length,
						).slice(dataLimitStart, dataLimitLast),
					].map((_, i) => (
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
					paintings={foundAuthorsItems().foundAuthor.works}
					author={foundAuthorsItems().foundAuthor}
					loading={loading}
					setLoading={setLoading}
				/>
			);
		}
	};

	const showContent = () => {
		switch (aboutAuthorSwitchContentBtn) {
			case 0:
				return authorsBio();
			case 1:
				return authorsWorks();
			case 2:
				return (
					<AboutAuthorReviews
						authorInfo={foundedAuthor}
						setFoundedAuthor={setFoundedAuthor}
						switchBtn={switchBtn}
						authorsDataStatus={authorsDataStatus}
						setDataSelected={setReviewsDataSelected}
						setLimitLast={setReviewsDataLimitLast}
						limitLast={reviewsDataLimitLast}
						limitStart={reviewsDataLimitStart}
						dataSelected={reviewsDataSelected}
						dataLength={reviewsDataLength}
						loading={loading}
						setLoading={setLoading}
						onDeleteMessage={onDeleteMessage}
						setReviews={setReviews}
						reviews={reviews}
					/>
				);
			case 3:
				return (
					<AboutAuthorChat
						authorInfo={foundedAuthor}
						authorsDataStatus={authorsDataStatus}
						setDataSelected={setReviewsDataSelected}
						setLimitLast={setReviewsDataLimitLast}
						limitLast={reviewsDataLimitLast}
						limitStart={reviewsDataLimitStart}
						dataSelected={reviewsDataSelected}
						onDeleteMessage={onDeleteMessage}
						setMessages={setMessages}
						messages={messages}
						setLoading={setLoading}
						loading={loading}
					/>
				);
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
					{showContent()}
				</div>
			</div>
		</div>
	);
};

export default AboutAuthorPage;
