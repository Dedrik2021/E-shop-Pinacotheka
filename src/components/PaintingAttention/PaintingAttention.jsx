import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { memo } from 'react';

import background from '../../assets/images/error-404.png';
import backgroundBlur from '../../assets/images/error-404.png';

import './paintingAttention.scss';

const PaintingAttention = memo((props) => {
	const { attention1, attention2, title, marginTop } = props;

	const switchLanguageBtn = useSelector((state) => state.langBtnsSlice.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;

	return (
		<section className="painting-attention" style={{marginTop: marginTop}}>
			<div className="container">
				<div
					className="painting-attention__bg"
					style={{ backgroundImage: `url(${background})` }}
				>
					<div
						className="painting-attention__blur blur"
						style={{ backgroundImage: `url(${backgroundBlur})` }}
					></div>
					<span className="painting-attention__bg-color"></span>
					<div className="painting-attention__box">
						<span className="painting-attention__subtitle">
							{switchBtn ? 'Ölgemälde' : 'Painting'}
						</span>
						<h1 className="painting-attention__title title">{title}</h1>
						<div className="painting-attention__text">
							<p>
								{attention1}
							</p>
							<p>
								{attention2}
							</p>
						</div>
						<Link
							className="painting-attention__btn btn btn--red btn--universal"
							to={'/'}
						>
							{switchBtn ? 'Zum Katalog gehen' : 'Go to the catalog'}
						</Link>
						<Link className="painting-attention__link more-link" to={'/'}>
							{switchBtn ? 'Zurück zur Hauptseite' : 'Back to the main page'}
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
});

export default PaintingAttention;
