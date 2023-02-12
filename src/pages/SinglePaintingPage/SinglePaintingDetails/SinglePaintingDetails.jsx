import { memo } from 'react';
import { Link } from 'react-router-dom';

import AboutPaintingInfo from '../../../components/AboutPaintingInfo/AboutPaintingInfo';

import LikeIcon from '../../../assets/sprite/like-icon.svg';
import MessageIcon from '../../../assets/sprite/message-icon.svg';

import './singlePaintingDetails.scss';

const SinglePaintingDetails = memo((props) => {
	const {
		switchBtn,
		painting,
		clickOnReviewBtn,
		clickOnLikeMeBtn,
		likeMe,
		clickOnBuyPainting,
		buyPainting,
	} = props;

	return (
		<section className="creations-details__info">
			<h2 className="sr-only">Einzelheiten</h2>
			<article className="details-card">
				<div className="details-card__wrapper-img">
					<img
						className="details-card__img"
						src={painting.img}
						alt={painting.title}
						width="800"
						height="550"
					/>
					<img
						className="details-card__img details-card__img--blur"
						src={painting.img}
						alt={painting.title}
						width="800"
						height="550"
					/>
				</div>
				<div className="details-card__box">
					<span className="details-card__lot">
						Lot
						<span>№</span>
						{painting.lot}
					</span>
					<h3 className="details-card__title">{painting.title}</h3>
					<div className="details-card__wrapper">
						<span className="details-card__statistics details-card__statistics--shared">
							12 315 {switchBtn ? 'geteilt' : 'share'}
						</span>
						<span className="details-card__statistics details-card__statistics--viewing">
							2 315 {switchBtn ? 'ansehen' : 'view'}
						</span>
					</div>
					<div className="details-card__message">
						<button
							className={`details-card__message-btn details-card__message-btn--like btn ${
								likeMe ? 'active' : ''
							}`}
							type="button"
							title={`${
								likeMe !== undefined ? 'Remove from favourite' : 'Add to fafourite'
							}`}
							onClick={clickOnLikeMeBtn}
						>
							<span className="sr-only">like</span>
							<svg width="18" height="18">
								<use href={`${LikeIcon}#like`}></use>
							</svg>
						</button>
						<button
							className="details-card__message-btn details-card__message-btn--message btn"
							type="button"
							style={{ justifyContent: 'center' }}
							onClick={clickOnReviewBtn}
						>
							<svg width="18" height="18">
								<use href={`${MessageIcon}#message`}></use>
							</svg>
							<span>
								{switchBtn ? 'Schreiben dem einen Kommentar' : 'Leave a comment'}
							</span>
						</button>
					</div>

					<AboutPaintingInfo info={painting} switchBtn={switchBtn} />
					<div className="details-card__price">
						<span className="details-card__price-sum">
							<span>€</span>
							{painting.price}
						</span>
						<div className="details-card__question">
							{switchBtn ? 'Wie kauft man?' : 'How to buy?'}
							<p className="details-card__question-text">
								{switchBtn
									? 'Gehen Sie zum Online-Shop, wählen Sie ein Produkt aus und klicken Sie auf die Schaltfläche "Kaufen"!'
									: 'Go to the online store, select a product and press the "Buy" button!'}
							</p>
						</div>
					</div>
					<div className="details-card__btns">
						{buyPainting !== undefined ? (
							<Link
								className="details-card__btns-btn details-card__btns-btn--buy btn btn--red btn--universal"
								to={'/cart'}
							>
								Buy Now
							</Link>
						) : (
							<button
								className={`details-card__btns-btn details-card__btns-btn--buy btn btn--red-hover btn--universal`}
								type="submit"
								onClick={clickOnBuyPainting}
								title={`Add in Cart`}
							>
								{switchBtn ? 'Kaufen' : 'Buy'}
							</button>
						)}
						<button
							className="details-card__btns-btn btn btn--universal btn--red-hover"
							type="button"
							// onClick={onSuggestPrice}
						>
							{switchBtn ? 'Schlagen Sie einen Preis vor' : 'Suggest a price'}
						</button>
					</div>
				</div>
			</article>
		</section>
	);
});

export default SinglePaintingDetails;
