import { memo } from "react";
import { Link } from "react-router-dom";
import Slider from 'react-slick';

import './heroInfoSlider.scss'

const HeroInfoSlider = memo((props) => {
    const {infoSlider, sliderImg, setSliderInfo, paintingsInfo, onPainting, switchBtn} = props

	return (
		<Slider
			className="hero__content-slider"
			{...infoSlider}
			asNavFor={sliderImg}
			slide="ul"
			ref={(sliderInfo) => setSliderInfo(sliderInfo)}
		>
			{paintingsInfo.map(({ id, works }) => {
				
				return (
					<li className="hero__item" key={id}>
						<article className="pick-card">
							<h3 className="pick-card__title">{works[0].title}</h3>
							<span className="pick-card__id">
								ID
								<span>{works[0].lot}</span>
							</span>
							<div className="pick-card__wrapper">
								<span>{switchBtn ? 'Autor' : 'Author'}:</span>
								<Link className="pick-card__author" to={''} rel="author">
									{works[0].cardInfo[0]}
								</Link>
							</div>
							<span className="pick-card__material">
								<span>Material:</span>
								{works[0].material}
							</span>
							<div className="pick-card__box">
								<Link
									className="pick-card__btn btn btn--red btn--universal"
									to={`/Autor/Einzelmalerei/${id}`}
									onClick={() => onPainting(works[0].id)}
								>
									{switchBtn ? 'Mehr Details' : 'More details'}
								</Link>
								<span className="pick-card__price">
									<span>€</span>
									{works[0].price}
								</span>
							</div>
							<div className="pick-card__dots">
								<span className="pick-card__num">0{paintingsInfo[0].id}</span>
								<span className="pick-card__num">{paintingsInfo.length}</span>
							</div>
						</article>
					</li>
				);
			})}
		</Slider>
	);
})

export default HeroInfoSlider;
