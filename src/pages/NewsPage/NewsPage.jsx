import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import {
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	startAfter,
	startAt,
	doc,
	getDoc,
	endBefore,
	limitToLast,
	endAt,
} from 'firebase/firestore/lite';

import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import Pagination from '../../components/Pagination/Pagination';
import NewsCard from '../../components/NewsCard/NewsCard';
import NewsSkeleton from '../../skeletons/newsSkeleton';
import NewsBlockSkeleton from '../../skeletons/newsBlockSkeleton';

import { setBreadCrumbsTitle } from '../../redux/slices/breadCrumbsSlice';
import { Status } from '../../utils/status/status';

import { database, realDb } from '../../firebase/firebaseConfig';

import './newsPage.scss';

const News = () => {
	const auth = getAuth();
	const user = auth.currentUser;
	const dispatch = useDispatch();

	const [newsDataLength, setNewsDataLength] = useState(0);
	const [limitLast, setLimitLast] = useState(11);
	const [limitStart, setLimitStart] = useState(11);
	const [loading, setLoading] = useState(false);
	const [dataSelected, setDataSelected] = useState(1);

	const [userArray, setUserArray] = useState([]);
	const [getUsers, setGetUsers] = useState([]);
	const breadCrumbsTitle = useSelector((state) => state.breadCrumbsSlice.breadCrumbsTitle);

	const { newsData, newsDataStatus } = useSelector((state) => state.newsSlice);
	const switchLanguageBtn = useSelector((state) => state.langBtnsSlice.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		dispatch(setBreadCrumbsTitle(''));
		const pathName = window.location.pathname.substring(1, 12);
		const name = pathName.split('/');
		dispatch(setBreadCrumbsTitle(name));
	}, [dispatch]);

	useMemo(() => {
		window.scrollTo(0, 0);
		setLoading(true);
		setLimitLast(11 * dataSelected);
		setLimitStart(limitLast - 11);
		setTimeout(() => {
			setLoading(false);
		}, 500);
	}, [dataSelected, limitLast]);

	useEffect(() => {
		setNewsDataLength(Math.ceil(newsData.length / 11));
	}, [newsData]);

	const onCurrentPage = (data) => {
		let currentPage = data.selected + 1;
		setDataSelected(currentPage);

		if (data.isNext) {
			setLimitLast(limitLast + 11);
		} else if (data.isPrevious) {
			setLimitLast(limitLast - 11);
		}
	};

	// useEffect(() => {
	// 	onAuthStateChanged(auth, (snapshot) => {
	// 		if (snapshot) {
	// 			onValue(ref(realDb, 'usersIdentify'), (snapshot) => {
	// 				if (snapshot.exists()) {
	// 					setUserArray(Object.values(snapshot.val()))
	// 				}
	// 			});
	// 		}
	// 	});
	// },[])

	// useEffect(() => {
	// 	let el = []
	// 	for (const item of userArray) {
	// 		for (const i in item) {
	// 			if (Object.hasOwnProperty.call(item, i)) {
	// 				el.push(item[i]);
	// 			}
	// 		}
	// 	}
	// 	setGetUsers(el)
	// },[userArray])

	// const dataUsers = getUsers.map(item => {
	// 	return item.user
	// })

	// console.log(getUsers.filter((el) => el.user === 'author'));

	const showCreateNewsBtn = () => {
		return (
			<Link
				className="single-news__edit-btn btn btn--red btn--universal"
				to={switchBtn ? '/Nachrichten/NachrichtenErstellen' : '/News/CreateNews'}
			>
				Create news
			</Link>
		);
	};

	const createBtn = user != null ? showCreateNewsBtn() : null;

	// const createBtn = user ? (
	// 	<Link
	// 			className="single-news__edit-btn btn btn--red btn--universal"
	// 			to={switchBtn ? '/Nachrichten/NachrichtenErstellen' : '/News/CreateNews'}
	// 		>
	// 			Create news
	// 		</Link>
	// ) : null

	// const fetchNews = async (currentPage) => {
	// 	setLoading(true);
	// 	const response = await fetch(`http://localhost:3001/news?_page=${currentPage}&_limit=11`);
	// 	const data = await response.json();
	// 	setNews(data);
	// 	const total = response.headers.get('x-total-count');
	// 	setPageCount(Math.ceil(total / 11));
	// 	setLoading(false);
	// 	return data;
	// };

	const contentLoaded = () => {
		if (newsDataStatus === Status.LOADING || newsDataStatus === Status.ERROR) {
			return (
				<div style={{ marginBottom: '20px' }}>
					<NewsSkeleton />
					{[...new Array(9)].map((_, i) => (
						<NewsBlockSkeleton key={i} breadCrumbsTitle={breadCrumbsTitle[0]} />
					))}
				</div>
			);
		} else if (newsDataStatus === Status.SUCCESS) {
			if (loading) {
				return (
					<div style={{ marginBottom: '20px' }}>
						<NewsSkeleton />
						{[
							...new Array(
								newsData.slice(limitStart, limitLast).length > 2
									? newsData.slice(limitStart, limitLast).length - 2
									: 0,
							),
						].map((_, i) => (
							<NewsBlockSkeleton key={i} breadCrumbsTitle={breadCrumbsTitle[0]} />
						))}
					</div>
				);
			} else {
				return (
					<ul className="news__list">
						{newsData.slice(limitStart, limitLast).map((news) => {
							return <NewsCard key={news.id} news={news} switchBtn={switchBtn} />;
						})}
					</ul>
				);
			}
		}
	};

	return (
		<>
			<Helmet>
				<meta name="description" content={switchBtn ? 'Nachrichten' : 'News'} />
				<title>{switchBtn ? 'Nachrichten' : 'News'}</title>
			</Helmet>
			<section className="news">
				<div className="container">
					<BreadCrumbs />
					<div className="news__wrapper">
						<h1 className="news__title title">{switchBtn ? 'Nachrichten' : 'News'}</h1>
						{/* <Link
							className="single-news__edit-btn btn btn--red btn--universal"
							to={switchBtn ? '/Nachrichten/NachrichtenErstellen' : '/News/CreateNews'}
						>
							Create news
						</Link> */}
						<div>{createBtn}</div>
					</div>
					{contentLoaded()}
					<Pagination
						pageChange={onCurrentPage}
						pageCount={newsDataLength}
						dataSelected={dataSelected}
					/>
				</div>
			</section>
		</>
	);
};

export default News;
