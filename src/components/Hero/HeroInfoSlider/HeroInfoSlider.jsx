import { memo } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import './heroInfoSlider.scss';

const HeroInfoSlider = memo((props) => {
	const { infoSlider, sliderImg, setSliderInfo, paintingsInfo, onPainting, switchBtn } = props;

	const firstPaintings = paintingsInfo.map((item) => item.works[0]);

	console.log(firstPaintings[0]);

	return (
		<Slider
			className="hero__content-slider"
			{...infoSlider}
			asNavFor={sliderImg}
			slide="ul"
			ref={(sliderInfo) => setSliderInfo(sliderInfo)}
		>
			{/* <ul> */}
				{firstPaintings.map((work, i) => {
					return (
						<li className="hero__item" key={i}>
							<article className="pick-card">
								<h3 className="pick-card__title">{work.title}</h3>
								<span className="pick-card__id">
									ID
									<span>{work.lot}</span>
								</span>
								<div className="pick-card__wrapper">
									<span>{switchBtn ? 'Autor' : 'Author'}:</span>
									<Link className="pick-card__author" to={''} rel="author">
										{work.cardInfo[0]}
									</Link>
								</div>
								<span className="pick-card__material">
									<span>Material:</span>
									{work.material}
								</span>
								<div className="pick-card__box">
									<Link
										className="pick-card__btn btn btn--red btn--universal"
										// to={`/Author/SinglePainting/${work.id}`}
										// to={''}
										onClick={() => onPainting(work.emailId)}
									>
										{switchBtn ? 'Mehr Details' : 'More details'}
									</Link>
									<span className="pick-card__price">
										<span>€</span>
										{work.price}
									</span>
								</div>
								<div className="pick-card__dots">
									<span className="pick-card__num">0{paintingsInfo[0].id}</span>
									<span className="pick-card__num">0{paintingsInfo.length}</span>
								</div>
							</article>
						</li>
					);
				})}
			{/* </ul> */}
		</Slider>
	);
});

export default HeroInfoSlider;
