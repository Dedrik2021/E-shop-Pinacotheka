import { useDispatch, useSelector } from 'react-redux';
import { memo, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Helmet from 'react-helmet';
import { deleteDoc, doc } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';

import NewsCard from '../../components/NewsCard/NewsCard';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import { setBreadCrumbsTitle } from '../../redux/slices/breadCrumbsSlice';

import SingleNewsSkeleton from '../../skeletons/singleNewsSkeleton';

import './singleNewsPage.scss';

const SingleNews = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { newsData, newsDataStatus } = useSelector((state) => state.newsSlice);
	const switchLanguageBtn = useSelector((state) => state.langBtnsSlice.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;
	const breadCrumbsTitle = useSelector((state) => state.breadCrumbsSlice.breadCrumbsTitle);
	const auth = getAuth();
	const user = auth.currentUser;
	const foundNews = newsData.find((news) => news.id == id);

	// const onDelete = () => {
	// 	if (window.confirm('Delete news! are you sure?')) {
	// 		const docToUpdates = doc(database, 'news', foundNews.ID);
	// 		deleteDoc(docToUpdates)
	// 			.then(navigate(switchBtn ? '/Nachrichten' : '/News'))
	// 			.catch((err) => {
	// 				alert(err.message);
	// 			});
	// 	}
	// };

	// const showBtns = () => {
	// 	return user ? (
	// 		<>
	// 			<button className="single-news__delete-btn btn btn--universal" type="button" onClick={onDelete}>
	// 				Delete news
	// 			</button>
	// 			<Link
	// 				className="single-news__edit-btn btn btn--red btn--universal"
	// 				to={`${switchBtn ? '/Nachrichten/NeuigkeitenBearbeiten/' : '/News/EditNews/'}${id}`}
	// 			>
	// 				Edit news
	// 			</Link>
	// 		</>
	// 	) : null;
	// }

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
		if (newsDataStatus === 'loading' || newsDataStatus === 'error') {
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
				<meta name="description" content={switchBtn ? 'Nachricht' : 'News'} />
				<title>{switchBtn ? 'Nachricht' : 'News'}</title>
			</Helmet>
			{/* {content}
			{errorMessage} */}
			<div className="container">
				<BreadCrumbs />
				<section className="single-news">
					<div className="single-news__wrapper">
						<h1 className="single-news__title title">
							{switchBtn ? 'Nachricht' : 'News'}
						</h1>
						<div className="single-news__btns-wrapper">{/* {showBtns()} */}</div>
					</div>
					{contentLoaded()}
				</section>
			</div>
		</>
	);
};

export default SingleNews;
