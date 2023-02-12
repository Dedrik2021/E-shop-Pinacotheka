import { useDispatch, useSelector } from 'react-redux';
import { memo, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Helmet from 'react-helmet';
import { deleteDoc, doc } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
import { ref, getDownloadURL } from 'firebase/storage';

import NewsCard from '../../components/NewsCard/NewsCard';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';

import { setBreadCrumbsTitle } from '../../redux/slices/breadCrumbsSlice';
import { database } from '../../firebase/firebaseConfig';
import { fetchNewsData } from '../../redux/modules/news/newsThunks';
import SingleNewsSkeleton from '../../skeletons/singleNewsSkeleton';
import { Status } from '../../utils/status/status';
import { storage } from '../../firebase/firebaseConfig';

import image from '../../assets/images/delete-img.png';

import './singleNewsPage.scss';

const SingleNews = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const auth = getAuth();
	const user = auth.currentUser;

	const [open, setOpen] = useState(false);

	const { newsData, newsDataStatus } = useSelector((state) => state.newsSlice);
	const switchLanguageBtn = useSelector((state) => state.langBtnsSlice.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;
	const breadCrumbsTitle = useSelector((state) => state.breadCrumbsSlice.breadCrumbsTitle);
	const foundNews = newsData.find((news) => news.id == id);

	const clickOnDelete = () => {
		const docToUpdates = doc(database, 'news', foundNews.ID);
		deleteDoc(docToUpdates)
			.then(navigate(switchBtn ? '/Nachrichten' : '/News'))
			.then(setOpen(false))
			.catch((err) => {
				alert(err.message);
			});
		dispatch(fetchNewsData());
		setTimeout(() => {
			dispatch(fetchNewsData());
		}, 200);
	};

	
	
	// useEffect(() => {
	// 	getImages()
	// },[])
	
	// const getImages = () => {
	// 	const starsRef = ref(storage, 'images/ news/ 31/gs://pinakotheka-12056.appspot.com');
	// 	getDownloadURL(starsRef)
	// 	.then((url) => {
	// 		console.log(url);
	// 		// Insert url into an <img> tag to "download"
	// 	})
	// 	.catch((error) => {
	// 		switch (error.code) {
	// 			case 'storage/object-not-found':
					
	// 				break;
	// 			case 'storage/unauthorized':
	// 				// User doesn't have permission to access the object
	// 				break;
	// 			case 'storage/canceled':
	// 				// User canceled the upload
	// 				break;

	// 			// ...

	// 			case 'storage/unknown':
	// 				// Unknown error occurred, inspect the server response
	// 				break;
	// 		}
	// 	});
	// }

	const clickOpenConfirmModal = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const showBtns = () => {
		return user ? (
			<>
				<button
					className="single-news__delete-btn btn btn--universal"
					type="button"
					onClick={clickOpenConfirmModal}
				>
					Delete news
				</button>
				<Link
					className="single-news__edit-btn btn btn--red btn--universal"
					to={`/News/EditNews/${id}`}
				>
					Edit news
				</Link>
			</>
		) : null;
	};

	useEffect(() => {
		window.scroll(0, 0);
	}, []);

	useEffect(() => {
		dispatch(setBreadCrumbsTitle(''));
		const pathName = window.location.pathname.substring(1, 16);
		const name = pathName.split('/');
		dispatch(setBreadCrumbsTitle(name));
	}, [dispatch]);

	const contentLoaded = () => {
		if (newsDataStatus === Status.LOADING || newsDataStatus === Status.ERROR) {
			return <SingleNewsSkeleton />;
		} else {
			return (
				<ul className="news__list">
					<NewsCard
						switchBtn={switchBtn}
						news={foundNews}
						breadCrumbsTitle={breadCrumbsTitle[1]}
					/>
				</ul>
			);
		}
	};

	return (
		<>
			<Helmet>
				<meta
					name="description"
					content={
						switchBtn
							? `Nachricht ${foundNews && foundNews.title}`
							: `News ${foundNews && foundNews.title}`
					}
				/>
				<title>
					{switchBtn
						? `Nachricht ${foundNews && foundNews.title}`
						: `News ${foundNews && foundNews.title}`}
				</title>
			</Helmet>
			<div className={`container single-news__container ${open ? 'active' : ''}`}>
				<ConfirmModal
					openModal={open}
					handleClose={handleClose}
					clickOnBtn={clickOnDelete}
					image={image}
					imgStyles={{ height: '300px', width: '70%' }}
					message={
						switchBtn
							? `"${
									foundNews !== undefined && foundNews.title
							  }" Nachricht löschen? Bist du dir sicher?`
							: `Delete "${
									foundNews !== undefined && foundNews.title
							  }" news? Are you sure?`
					}
				/>
				<BreadCrumbs />
				<section className="single-news">
					<div className="single-news__wrapper">
						<h1 className="single-news__title title">
							{switchBtn ? 'Nachricht' : 'News'}
						</h1>
						<div className="single-news__btns-wrapper">
							<div>{showBtns()}</div>
						</div>
					</div>
					{contentLoaded()}
				</section>
			</div>
		</>
	);
};

export default SingleNews;
