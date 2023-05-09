import { useEffect, useState, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Helmet from 'react-helmet';
import { getAuth } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import { doc, arrayRemove, updateDoc, arrayUnion } from 'firebase/firestore/lite';
import {v4 as costomId} from 'uuid'

import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import ReviewModal from '../../components/reviewModal/ReviewModal';

import { setBreadCrumbsTitle } from '../../redux/slices/breadCrumbsSlice';
import { realDb } from '../../firebase/firebaseConfig';
import { database } from '../../firebase/firebaseConfig';

import SinglePaintingDetails from './SinglePaintingDetails/SinglePaintingDetails';
import SinglePaintingAuthorInfo from './SinglePaintingAuthorInfo/SinglePaintingAuthorInfo';
import SinglePaintingGallerySection from './SinglePaintingGallerySection/SinglePaintingGallerySection';
import SinglePaintingSkeleton from '../../skeletons/singlePaintingSkeleton';
import { setShowModal } from '../../redux/slices/modalContentSlice';
import { Status } from '../../utils/status/status';
import { fetchUsersData } from '../../redux/modules/users/usersThunks';
import { fetchAuthorsData } from '../../redux/modules/authors/authorsThunks';
import { setCountLikeMe } from '../../redux/modules/users/usersSlice';

import './singlePaintingPage.scss';
import { useLayoutEffect } from 'react';

const SinglePaintingPage = () => {
	const { id } = useParams();
	const auth = getAuth();
	const dispatch = useDispatch();
	const user =  auth.currentUser;

	const { countLikeMe} = useSelector((state) => state.usersSlice);

	const [filterBtn, setFilterBtn] = useState(0);
	const [authorsEmailId, setAuthorsEmailId] = useState('');
	const [authorsWorksDataSelected, setAuthorsWorksDataSelected] = useState(1);
	const [authorsWorksDataLength, setAuthorsWorksDataLength] = useState(0);
	const [authorsWorksLimitLast, setAuthorsWorksLimitLast] = useState(6);
	const [authorsWorksLimitStart, setAuthorsWorksLimitStart] = useState(6);
	const [authorsSimilarWorksDataSelected, setAuthorsSimilarWorksDataSelected] = useState(1);
	const [authorsSimilarWorksDataLength, setAuthorsSimilarWorksDataLength] = useState(0);
	const [authorsSimilarWorksLimitLast, setAuthorsSimilarWorksLimitLast] = useState(6);
	const [authorsSimilarWorksLimitStart, setAuthorsSimilarWorksLimitStart] = useState(6);
	const [watchedWorksByAuthorsDataSelected, setWatchedWorksByAuthorsDataSelected] = useState(1);
	const [watchedWorksByAuthorsDataLength, setWatchedWorksByAuthorsDataLength] = useState(0);
	const [watchedWorksByAuthorsLimitLast, setWatchedWorksByAuthorsLimitLast] = useState(6);
	const [watchedWorksByAuthorsLimitStart, setWatchedWorksByAuthorsLimitStart] = useState(6);
	const [openModal, setOpenModal] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [likeBtn, setLikeBtn] = useState(false);
	const [buyBtn, setBuyBtn] = useState(false);

	const { authorsData, authorsDataStatus, paintingWatched } = useSelector(
		(state) => state.authorsSlice,
	);
	const {showModal} = useSelector(state => state.useModalContentSlice)
	const switchLanguageBtn = useSelector((state) => state.langBtnsSlice.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;
	const { foundUser } = useSelector((state) => state.usersSlice);

	useEffect(() => {
		window.scroll(0, 0);
		onValue(ref(realDb, 'singlePainting'), (snapshot) => {
			if (snapshot.exists()) {
				setAuthorsEmailId(Object.values(snapshot.val()));
			}
		});
	}, []);

	useEffect(() => {
		dispatch(setBreadCrumbsTitle(''));
		const pathName = window.location.pathname.substring(1, 15);
		const name = pathName.split('/');
		dispatch(setBreadCrumbsTitle(name));
	}, [dispatch]);

	const foundInterestingAuthorsWorks = () => {
		const works = [];
		const paintingsInfo = authorsData.map((item) => item.works);
		for (const i of paintingsInfo) {
			works.push(...i);
		}
		const similarPaintings = works.filter((work) => work.category === getItems().painting.category);
		return { similarPaintings };
	};

	const foundPainting = () => {
		const foundAuthor = authorsData.find((author) => author.emailId === authorsEmailId[0]);
		const searchPainting =
			foundAuthor !== undefined && foundAuthor.works.find((work) => work.id == id);
		return searchPainting !== undefined && { searchPainting, foundAuthor };
	};

	const getItems = () => {
		const painting = foundPainting().searchPainting;
		const author = foundPainting().foundAuthor;
		const likeMeActive = foundUser && foundUser.likeMe.find(item => item.initialID === painting.id)
		const buyingPainting = foundUser && foundUser.cart.find(item => item.initialID === painting.id)

		return {
			painting,
			author,
			likeMeActive,
			buyingPainting
		}
	}	

	useMemo(() => {
		setLikeBtn(getItems().likeMeActive !== undefined ? true : false)
	}, [getItems().likeMeActive])
	
	
	useMemo(() => {
		setBuyBtn(getItems().buyingPainting !== undefined ? true : false)
	}, [getItems().buyingPainting])


	useMemo(() => {
		setAuthorsWorksLimitLast(6 * authorsWorksDataSelected);
		setAuthorsWorksLimitStart(authorsWorksLimitLast - 6);

		setAuthorsSimilarWorksLimitLast(6 * authorsSimilarWorksDataSelected);
		setAuthorsSimilarWorksLimitStart(authorsSimilarWorksLimitLast - 6);

		setWatchedWorksByAuthorsLimitLast(6);
		setWatchedWorksByAuthorsLimitStart(0);
	}, [
		authorsWorksDataSelected,
		authorsWorksLimitLast,
		authorsSimilarWorksDataSelected,
		authorsSimilarWorksLimitLast,
	]);

	useEffect(() => {
		setAuthorsWorksDataLength(Math.ceil(getItems().author !== undefined && getItems().author.works.length / 6));
		setAuthorsSimilarWorksDataLength(
			Math.ceil(
				getItems().author !== undefined && foundInterestingAuthorsWorks().similarPaintings.length / 6,
			),
		);
	}, [getItems().author, paintingWatched]);

	const clickOnReviewBtn = () => {
		if (user !== null) {
			setIsLoading(true)
			setOpenModal(!openModal)
			dispatch(fetchAuthorsData())
			setTimeout(() => {
				setIsLoading(false)
			}, 1100);
		} else {
			dispatch(setShowModal(!showModal))
		}
	}

	
	const clickOnLikeMeBtn = () => {
		setLikeBtn(!likeBtn);
		if (likeBtn) {
			dispatch(setCountLikeMe(countLikeMe - 1))
			const removeLike = getItems().likeMeActive
			const collectionReff = doc(database, foundUser.user === 'authors' ? 'authors' : 'users', foundUser.ID);
			
			updateDoc(collectionReff, {
				likeMe: arrayRemove(removeLike),
			})
				.then(dispatch(foundUser.user === 'authors' ? fetchAuthorsData() : fetchUsersData()))
				.catch((error) => {
					console.log(error.message);
				});
		} else {
			
			dispatch(setCountLikeMe(countLikeMe + 1))
			const newLike = {
				id: costomId(),
				initialID: getItems().painting.id,
				author: getItems().painting.cardInfo[0],
				image: getItems().painting.image,
				rating: getItems().painting.rating,
				title: getItems().painting.title,
				date: new Date().toLocaleDateString(),
				timeToLike: new Date().toLocaleTimeString(),
				lot: getItems().painting.lot,
				price: getItems().painting.price,
				page: getItems().painting.page
			};

			const collectionReff = doc(database, foundUser.user === 'authors' ? 'authors' : 'users', foundUser.ID);

			updateDoc(collectionReff, {
				likeMe: arrayUnion(newLike),
			})
			.then(dispatch(foundUser.user === 'authors' ? fetchAuthorsData() : fetchUsersData()))
			.catch((error) => {
				console.log(error.message);
			});
		}
		
	}

	const clickToBuyBtn = () => {
		setBuyBtn(true)
		const newBuying = {
			id: costomId(),
			initialID: getItems().painting.id,
			author: getItems().painting.cardInfo[0],
			image: getItems().painting.image,
			rating: getItems().painting.rating,
			title: getItems().painting.title,
			date: new Date().toLocaleDateString(),
			timeToLike: new Date().toLocaleTimeString(),
			lot: getItems().painting.lot,
			price: getItems().painting.price,
			page: getItems().painting.page
		};

		const collectionReff = doc(database, foundUser.user === 'authors' ? 'authors' : 'users', foundUser.ID);

			updateDoc(collectionReff, {
				cart: arrayUnion(newBuying),
			})
			.then(dispatch(foundUser.user === 'authors' ? fetchAuthorsData() : fetchUsersData()))
				.catch((error) => {
					console.log(error.message);
				});
	}

	return (
		<>
			<Helmet>
				<meta
					name="description"
					content={switchBtn ? `Details von das Bildes ${getItems().getItems().painting.title}` : `Details of the painting ${getItems().painting.title}`}
				/>
				<title>{switchBtn ? `Details von das Bildes ${getItems().painting.title}` : `Details of the painting ${getItems().painting.title}`}</title>
			</Helmet>
				{openModal && (
					<ReviewModal 
						openModal={openModal} 
						handleClose={setOpenModal} 
						itemProp={getItems().painting} 
						author={getItems().author} 
						painting={getItems().painting}
						isLoading={isLoading}
						setIsLoading={setIsLoading}
					/>
				)}
			<div className={`creations-details ${openModal ? 'active' : ''}`}>
				<div className="container">
					<BreadCrumbs />
					{authorsDataStatus === Status.LOADING || authorsDataStatus === Status.ERROR ? (
						<SinglePaintingSkeleton />
					) : (
						<SinglePaintingDetails 
							switchBtn={switchBtn} 
							painting={getItems().painting} 
							clickOnReviewBtn={clickOnReviewBtn} 
							clickOnLikeMeBtn={clickOnLikeMeBtn}
							likeMe={getItems().likeMeActive}
							likeBtn={likeBtn}
							clickOnBuyPainting={clickToBuyBtn}
							buyPainting={getItems().buyingPainting}
							buyBtn={buyBtn}
						/>
					)}

					<SinglePaintingAuthorInfo
						filterBtn={filterBtn}
						setFilterBtn={setFilterBtn}
						switchBtn={switchBtn}
						painting={getItems().painting}
						author={getItems().author}
					/>

					<SinglePaintingGallerySection
						switchBtn={switchBtn}
						paintings={getItems().author !== undefined && getItems().author.works}
						setDataSelected={setAuthorsWorksDataSelected}
						setLimitLast={setAuthorsWorksLimitLast}
						limitLast={authorsWorksLimitLast}
						limitStart={authorsWorksLimitStart}
						dataLength={authorsWorksDataLength}
						dataSelected={authorsWorksDataSelected}
						author={getItems().author}
						sectionClassName={'others-creation'}
						sectionAn={'other works by the author'}
						sectionDe={'andere Werke das Autors'}
						title={'others-creation__title'}
					/>
				</div>
				<SinglePaintingGallerySection
					switchBtn={switchBtn}
					author={getItems().author}
					paintings={foundInterestingAuthorsWorks().similarPaintings}
					setDataSelected={setAuthorsSimilarWorksDataSelected}
					setLimitLast={setAuthorsSimilarWorksLimitLast}
					limitLast={authorsSimilarWorksLimitLast}
					limitStart={authorsSimilarWorksLimitStart}
					dataLength={authorsSimilarWorksDataLength}
					dataSelected={authorsSimilarWorksDataSelected}
					sectionClassName={'similar-paintings'}
					sectionAn={'Paintings with similar themes'}
					sectionDe={'Gemälde mit ähnlichen Themen'}
					title={'similar-paintings__title'}
				/>
				{paintingWatched.length > 0 && (
					<SinglePaintingGallerySection
						switchBtn={switchBtn}
						paintings={paintingWatched}
						setDataSelected={setWatchedWorksByAuthorsDataSelected}
						setLimitLast={setWatchedWorksByAuthorsLimitLast}
						limitLast={watchedWorksByAuthorsLimitLast}
						limitStart={watchedWorksByAuthorsLimitStart}
						dataLength={watchedWorksByAuthorsDataLength}
						dataSelected={watchedWorksByAuthorsDataSelected}
						author={getItems().author}
						sectionClassName={'recent-watched'}
						sectionAn={'recently you watched'}
						sectionDe={'vor kurzem hast du zugeschaut'}
						title={'recent-watched__title'}
					/>
				)}
			</div>
		</>
	);
};

export default SinglePaintingPage;
