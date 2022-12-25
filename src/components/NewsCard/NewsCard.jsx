import { memo } from 'react';
import { Link } from 'react-router-dom';

import './newsCard.scss'

const NewsCard = memo(({ newsData, switchBtn }) => {
	
	return (
		<ul className="news__list">
			{newsData.map(({ id, title, textInfo, img, data, author }) => {
				return (
					<li className="news__item" key={id}>
						<Link
							className="news-card__link"
							to={`${switchBtn ? '/Nachrichten/Nachricht/' : '/News/Newses/'}${id}`}
						>
							<article className="news-card">
								<div className="news-card__img-wrapper">
									<img src={img} alt={title} />
								</div>
								<div className="news-card__box">
									{/* <time className="news-card__date" dateTime="2020-10-30T08:10:11+07:00">
										{data}
									</time> */}
									<div className="news-card__author-wrapper">
										<span className='news-card__author'>
											Author by:
											<span> {author}</span>
										</span>
											<time className="news-card__date" dateTime={data}>
												{data}
											</time>
									</div>
									<h3 className="news-card__title">{title}</h3>
									<div className="news-card__text">
										<p>{textInfo[0]}</p>
									</div>
								</div>
							</article>
						</Link>
					</li>
				);
			})}
		</ul>
	);
});

export default NewsCard;
