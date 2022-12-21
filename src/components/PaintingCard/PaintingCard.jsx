import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { memo } from 'react';

import FavoriteIcon from '../../assets/sprite/favorit-icon.svg';
import ShareIcon from '../../assets/sprite/share-icon.svg'

import './paintingCard.scss'

// const PaintingCard = memo((props) => {
// 	const { works } = props;

// 	const content = works.map((item) => <Painting key={item.id} item={item} props={props} />);

// 	return <>{content}</>;
// });

const PaintingCard = memo(({ paintingsInfo, switchBtn }) => {
	// const dispatch = useDispatch();
	// const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	// const switchBtn = switchLanguageBtn[0] === 0

	// const onAuthorInfo = () => {
	// 	const findPainting = {
	// 		painting: item.id,
	// 	};
	// 	dispatch(setAuthorInfoBtn(0));
	// 	dispatch(changeSinglePainting({ findPainting }));
	// };

    const authorsWorks = paintingsInfo.map(item => item.works)
    const works = []
    for (const i of authorsWorks) {
        works.push(...i)
    }

	return (
		<ul className="gallery__list cards-list">
            {works.map((item, i) => {
                return (
                    <li className="gallery__item" key={i}>
				<article className="painting-card" tabIndex="0">
					<Link
						className="painting-card__img-link"
						// to={`${switchBtn ? '/Autor/Einzelmalerei' : '/Author/SinglePainting'}/${props.id}`}
						to={''}
						// onClick={() => onAuthorInfo()}
					>
						<img src={item.img} alt={item.title} />
					</Link>
					<Link
						className="painting-card__link"
						// onClick={() => onAuthorInfo()}
						// to={`${switchBtn ? '/Autor/Einzelmalerei' : '/Author/SinglePainting'}/${
						// 	props.id
						// }`}
                        to={''}
					>
						<h3 className="painting-card__title">{item.title}</h3>
					</Link>
					<div className="painting-card__box">
						<div className="painting-card__wrapper">
							<Link
								// className="painting-card__author-link"
								// to={`${switchBtn ? '/Autor' : '/Author'}/${props.id}`}
								// onClick={() => onAuthorInfo()}
                                to={''}
							>
								<span>{item.name}</span>
							</Link>
							<span className="painting-card__material">{item.material}</span>
						</div>
						<div className="painting-card__rating">
							<div className="painting-card__stars"></div>

							<span className="painting-card__price">
								{item.price}
								<span>€</span>
							</span>
						</div>

						<div className="painting-card__buy">
							<a
								className="painting-card__btn btn btn--universal btn--red-hover"
								href="#"
							>
								{switchBtn ? 'Kaufen' : 'Buy'}
							</a>
							<a
								className="painting-card__btn painting-card__btn--share btn btn--red-hover"
								href="#"
							>
								<span className="sr-only">share</span>
								<svg width="18" height="18">
									<use href={`${ShareIcon}#share`}></use>
								</svg>
							</a>
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
                )
            })}
			
		</ul>
	);
});

export default PaintingCard;
