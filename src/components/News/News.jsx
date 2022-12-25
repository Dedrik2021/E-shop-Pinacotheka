import { useEffect, useState, memo, useMemo } from 'react';
import { Link } from 'react-router-dom';

import NewsCard from '../NewsCard/NewsCard';
import Pagination from '../Pagination/Pagination';

import NewsBlockSkeleton from '../../skeletons/newsBlockSkeleton';

import './news.scss';

const News = memo(({ switchBtn, newsData }) => {
	const [newsDataLength, setNewsDataLength] = useState(0);
	const [limitLast, setLimitLast] = useState(4);
	const [limitStart, setLimitStart] = useState(4);
	const [loading, setLoading] = useState(false);
	const [dataSelected, setDataSelected] = useState(1);

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

	const onCurrentPage = (data) => {
		let currentPage = data.selected + 1;
		setDataSelected(currentPage);

		if (data.isNext) {
			setLimitLast(limitLast + 4);
		} else if (data.isPrevious) {
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
