import { memo } from 'react';
import { Link } from 'react-router-dom';

import NewsCard from '../NewsCard/NewsCard';

import './news.scss';

const News = memo(({ switchBtn, newsData }) => {
	return (
		<div className={`news-block`}>
			<div className="container">
				<div className="news-block__box">
					<span className="news-block__title title">
						{switchBtn ? 'Nachrichten' : 'News'}
					</span>
					<Link className="news-block__link" to={'/News'}>
						{switchBtn ? 'Alle Nachrichten' : 'All News'}
					</Link>
				</div>
				<ul className="news__list">
					{newsData.slice(0, 4).map((news) => {
						return (
							<NewsCard
								key={news.id}
								news={news}
								switchBtn={switchBtn}
							/>
						);
					})}
				</ul>
			</div>
		</div>
	);
});

export default News;
