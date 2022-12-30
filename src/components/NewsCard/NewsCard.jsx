import { memo } from 'react';
import { Link } from 'react-router-dom';

import './newsCard.scss';

const NewsCard = memo(({ news, switchBtn, breadCrumbsTitle }) => {
	return (
		<li className="news__item">
			<Link
				className="news-card__link"
				to={`/News/SingleNews/${news !== undefined && news.id}`}
			>
				<article className="news-card">
					<div className="news-card__img-wrapper">
						<img
							src={news ? news.image : undefined}
							alt={news ? news.title : undefined}
						/>
					</div>
					<div className="news-card__box">
						<div className="news-card__author-wrapper">
							<span className="news-card__author">
								Author by:
								<span> {news !== undefined && news.author}</span>
							</span>
							<time
								className="news-card__date"
								dateTime={news ? news.data : undefined}
							>
								{news !== undefined && news.data}
							</time>
						</div>
						<h3 className="news-card__title">{news !== undefined && news.title}</h3>
						<div className="news-card__text">
							{news !== undefined && breadCrumbsTitle === 'SingleNews' ? (
								news.textInfo.map((text, i) => {
									return <p key={i}>{text}</p>;
								})
							) : (
								<p>{news.textInfo[0]}</p>
							)}
						</div>
					</div>
				</article>
			</Link>
		</li>
	);
});

export default NewsCard;
