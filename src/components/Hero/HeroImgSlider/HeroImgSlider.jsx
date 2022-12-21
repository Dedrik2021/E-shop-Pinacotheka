import { memo } from 'react';

import Slider from 'react-slick';

import './heroImgSlider.scss'

const HeroImgSlider = memo((props) => {
    const {imgSlider, sliderInfo, setSliderImg, paintingsInfo} = props

	return (
		<div className="container container--lg">
			<Slider
				className="hero__pick-slider"
				slide="ul"
				{...imgSlider}
				asNavFor={sliderInfo}
				ref={(sliderImg) => setSliderImg(sliderImg)}
			>
				{paintingsInfo.map(({ id, works }) => {
					return (
						<li className="hero__item" key={id}>
							<img
								src={works[0].img}
								alt={works[0].title}
								width="1035"
								height="540"
							/>
							<div
								className="hero__img-blur blur"
								style={{ backgroundImage: `url(${works[0].img})` }}
							></div>
						</li>
					);
				})}
			</Slider>
		</div>
	);
});

export default HeroImgSlider;
