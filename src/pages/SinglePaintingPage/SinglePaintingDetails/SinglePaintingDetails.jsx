import { memo } from 'react';

import AboutPaintingInfo from '../../../components/AboutPaintingInfo/AboutPaintingInfo';

import LikeIcon from '../../../assets/sprite/like-icon.svg';
import MessageIcon from '../../../assets/sprite/message-icon.svg';

import './singlePaintingDetails.scss';

const SinglePaintingDetails = memo(({ switchBtn, painting }) => {
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
							className={`details-card__message-btn details-card__message-btn--like btn`}
							type="button"
							// onClick={onPressLike}
						>
							<span className="sr-only">like</span>
							<svg width="18" height="18">
								<use href={`${LikeIcon}#like`}></use>
							</svg>
							<span>{painting.like}</span>
						</button>
						<button
							className="details-card__message-btn details-card__message-btn--message btn"
							type="button"
							style={{ justifyContent: 'center' }}
							// onClick={() => (dispatch(setAuthorInfoBtn(0)), dispatch(setModal(true)))}
						>
							<svg width="18" height="18">
								<use href={`${MessageIcon}#message`}></use>
							</svg>
							<span>{switchBtn ? 'Schreiben dem Autor' : 'Write to the author'}</span>
						</button>
					</div>

					<AboutPaintingInfo
                        info={painting}
                        switchBtn={switchBtn}
                    />
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
						<button
							className="details-card__btns-btn details-card__btns-btn--buy btn btn--red-hover btn--universal"
							type="submit"
							// onClick={(e) => onBuy(e)}
						>
							{switchBtn ? 'Kaufen' : 'Buy'}
						</button>
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
