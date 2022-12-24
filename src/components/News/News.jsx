import { useEffect, useState, memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore/lite';
import { useSelector } from 'react-redux';

import NewsCard from '../NewsCard/NewsCard';
import Pagination from '../Pagination/Pagination';

import NewsBlockSkeleton from '../../skeletons/newsBlockSkeleton';
import { database } from '../../firebase/firebaseConfig';

import './news.scss';

const News = memo(({ switchBtn, newsData }) => {
	const [newsDataLength, setNewsDataLength] = useState(0);
	const [limitLast, setLimitLast] = useState(4);
	const [limitStart, setLimitStart] = useState(4);
	const [loading, setLoading] = useState(false);
	const [dataSelected, setDataSelected] = useState(1);
	// const [news, setNews] = useState([]);
	// const [loading, setLoading] = useState(true)
	// const collectionRef = collection(database, 'news')
	// const modal = useSelector(state => state.authorsInfos.modal)
	// const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	// const switchBtn = switchLanguageBtn[0] === 0

	// useEffect(() => {
	//     getData()
	// },[])

	// const getData = async () => {
	//     setLoading(true)
	//     const collectionQuery = query(collectionRef, orderBy('id', 'desc'), limit(4))
	//     const dataNews = await getDocs(collectionQuery)
	//     const newsData = dataNews.docs.map(item => {
	//         return item.data()
	//     })
	//     setNews(newsData)
	//     setLoading(false)
	// }

	// console.log(news);

	// useEffect(() => {
	//     fetchNews()
	// }, [])

	// const fetchNews = async (currentPage) => {
	//     setLoading(true)
	//     const response = await fetch(`http://localhost:3001/news?_page=${currentPage}&_limit=4`);
	//     const data = await response.json();
	//     setNews(data)
	//     // const total = response.headers.get('x-total-count')
	//     // setPageCount(Math.ceil(total/4))
	//     setLoading(false)
	//     return data;
	// };

	// const onCurrentPage = async (data) => {
	//     let currentPage = data.selected + 1
	//     setDataSelected(currentPage)
	//     const fetchItems = await fetchNews(currentPage)
	//     setNews(fetchItems)
	// }

	// const content = loading ? (
	// 	[...new Array(4)].map((_, i) => <NewsBlockSkeleton key={i} />)
	// ) : (
	// 	<NewsCard news={news} />
	// );

	useMemo(() => {
		setLoading(true);
		setLimitLast(4 * dataSelected);
		setLimitStart(limitLast - 4);
		setTimeout(() => {
			setLoading(false);
		}, 500);
	}, [dataSelected, limitLast]);

	useEffect(() => {
		setNewsDataLength(Math.ceil(newsData.length / 4));
	}, [newsData]);

	const onCurrentPage = (authorsData) => {
		let currentPage = authorsData.selected + 1;
		setDataSelected(currentPage);

		if (authorsData.isNext) {
			setLimitLast(limitLast + 4);
		} else if (authorsData.isPrevious) {
			setLimitLast(limitLast - 4);
		}
	};

	return (
		<div className={`news-block`}>
			<div className="container">
				<div className="news-block__box">
					<span className="news-block__title title">
						{switchBtn ? 'Nachrichten' : 'News'}
					</span>
					<Link className="news-block__link" to={switchBtn ? '/Nachrichten' : '/News'}>
						{switchBtn ? 'Alle Nachrichten' : 'All News'}
					</Link>
				</div>
				<div style={{ height: '600px' }}>
					{!loading ? (
						<NewsCard
							newsData={newsData.slice(limitStart, limitLast)}
							switchBtn={switchBtn}
						/>
					) : (
						[...new Array(4)].map((_, i) => <NewsBlockSkeleton key={i} />)
					)}
				</div>
				<Pagination
					pageChange={onCurrentPage}
					pageCount={newsDataLength}
					dataSelected={dataSelected}
				/>
			</div>
		</div>
	);
});

export default News;
