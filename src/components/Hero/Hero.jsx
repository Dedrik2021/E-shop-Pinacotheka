import { useState, memo, useEffect } from 'react';

import HeroImgSlider from './HeroImgSlider/HeroImgSlider';
import HeroInfoSlider from './HeroInfoSlider/HeroInfoSlider';

import './hero.scss';

const NextArrow = (props) => {
	const { style, onClick } = props;
	return (
		<div
			className={'slick-btn slick-btn--next'}
			style={{ ...style, display: 'block', cursor: 'pointer' }}
			onClick={onClick}
		/>
	);
};

const PrevArrow = (props) => {
	const { style, onClick } = props;
	return (
		<div
			className={'slick-btn slick-btn--prev'}
			style={{ ...style, display: 'block', cursor: 'pointer' }}
			onClick={onClick}
		/>
	);
};

const Hero = memo(({ switchBtn, paintingsInfo }) => {
	const [sliderImg, setSliderImg] = useState();
	const [sliderInfo, setSliderInfo] = useState();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [])

	const onPainting = (id) => {
		const findPainting = {
			painting: id,
		};
	};

	const imgSlider = {
		slidesToShow: 1,
		slidesToScroll: 1,
		draggable: false,
		arrows: false,
		centerMode: true,
		centerPadding: '105px',
		responsive: [
			{
				breakpoint: 1890,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					fade: true,
					centerMode: false,
				},
			},
			{
				breakpoint: 1670,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					fade: true,
				},
			},
		],
	};

	const infoSlider = {
		prevArrow: <PrevArrow />,
		nextArrow: <NextArrow />,
		fade: true,
		draggable: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		autoplay: true,
	};

	return (
		<section className={`hero`}>
			<h2 className="sr-only">{switchBtn ? 'Unsere Autoren' : 'Our authors'}</h2>
			<div className="container">
				<span className="hero__circle"></span>
				<div className="hero__scroll">
					<span></span>
					{switchBtn ? 'Herunterrollen' : 'Roll down'}
				</div>
			</div>
			<div className="hero__sliders">
				<HeroImgSlider
					imgSlider={imgSlider}
					sliderInfo={sliderInfo}
					setSliderImg={setSliderImg}
					paintingsInfo={paintingsInfo}
				/>

				<HeroInfoSlider
					infoSlider={infoSlider}
					sliderImg={sliderImg}
					setSliderInfo={setSliderInfo}
					paintingsInfo={paintingsInfo}
					switchBtn={switchBtn}
					onPainting={onPainting}
				/>
			</div>
		</section>
	);
});

export default Hero;
