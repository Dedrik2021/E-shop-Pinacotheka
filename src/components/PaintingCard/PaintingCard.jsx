import { Link } from 'react-router-dom';
import { memo } from 'react';
import { ref, update } from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';

import { realDb } from '../../firebase/firebaseConfig';

import FavoriteIcon from '../../assets/sprite/favorit-icon.svg';
import ShareIcon from '../../assets/sprite/share-icon.svg';

import { setPaintingWatched } from '../../redux/modules/authors/authorsSlice';

import './paintingCard.scss';

const PaintingCard = memo(({ paintingInfo, switchBtn }) => {
	const dispatch = useDispatch()
	const { paintingWatched } = useSelector((state) => state.authorsSlice);

	const clickOnPainting = (paintingInfo) => {
		const docToUpdates = ref(realDb, `singlePainting`);
		update(docToUpdates, {
			authorEmailId: paintingInfo.emailId,
		}).catch((err) => {
			alert(err.message);
		});
		const filteredPainting = paintingWatched.filter(item => item.img !== paintingInfo.img)
		dispatch(setPaintingWatched([paintingInfo, ...filteredPainting]))
		window.scrollTo(0, 0);
	};


	return (
		<li className="gallery__item" >
			{/* {getContent(item)} */}
			<article className="painting-card" tabIndex="0">
				<Link
					className="painting-card__img-link"
					to={`/Author/SinglePainting/${paintingInfo.id}`}
					onClick={() => clickOnPainting(paintingInfo)}
				>
					<img src={paintingInfo.img} alt={paintingInfo.title} />
				</Link>
				<Link
					className="painting-card__link"
					to={`/Author/SinglePainting/${paintingInfo.id}`}
					onClick={() => clickOnPainting(paintingInfo.emailId)}
				>
					<h3 className="painting-card__title">{paintingInfo.title}</h3>
				</Link>
				<div className="painting-card__box">
					<div className="painting-card__wrapper">
						<Link
							className="painting-card__author-link"
							// to={`/Author/${props.id}`}
							// onClick={() => onAuthorInfo()}
							to={''}
						>
							<span>{paintingInfo.aboutCard[1]}</span>
						</Link>
						<span className="painting-card__material">{paintingInfo.material}</span>
					</div>
					<div className="painting-card__rating">
						<div className="painting-card__stars"></div>

						<span className="painting-card__price">
							{paintingInfo.price}
							<span>€</span>
						</span>
					</div>

					<div className="painting-card__buy">
						<Link
							className="painting-card__btn btn btn--universal btn--red-hover"
							to={''}
						>
							{switchBtn ? 'Kaufen' : 'Buy'}
						</Link>
						<Link
							className="painting-card__btn painting-card__btn--share btn btn--red-hover"
							to={''}
						>
							<span className="sr-only">share</span>
							<svg width="18" height="18">
								<use href={`${ShareIcon}#share`}></use>
							</svg>
						</Link>
						<button
							className="painting-card__btn painting-card__btn--favorite btn btn--red-hover"
							type="button"
						>
							<span className="sr-only">added to favorite pick</span>
							<svg width="22" height="18">
								<use href={`${FavoriteIcon}#favourite`}></use>
							</svg>
						</button>
					</div>
				</div>
			</article>
		</li>
	);
});

export default PaintingCard;
