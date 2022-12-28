import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {memo} from 'react'

import background from '../../assets/images/error-404.png'
import backgroundBlur from '../../assets/images/error-404.png'

import './error404Page.scss'

const Error404 = memo(({noData}) => {

    const switchLanguageBtn = useSelector((state) => state.langBtnsSlice.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;
    
	return (
		<section className="error-404" style={{marginTop: noData.length === 0 && '0'}}>
			<div className="container">
				<div className="error-404__bg" style={{backgroundImage: `url(${background})`}}>
					<div
						className="error-404__blur blur"
						style={{backgroundImage: `url(${backgroundBlur})`}}
					></div>
					<span className="error-404__bg-color"></span>
					<div className="error-404__box">
						<span className="error-404__subtitle">
                            {switchBtn ? 'Ölgemälde' : 'Painting'}
                        </span>
						<h1 className="error-404__title title">{noData.length > 0 ? '"404 Error"' : 'No Data'}</h1>
						<div className="error-404__text">
							{noData.length > 0 ? (
								<>
								<p>{switchBtn ? 'Wir sind bereits dabei zu vermissen!' : 'We are already missing!'}</p>
							<p>{switchBtn ? 'Aber es gibt noch viele andere Gemälde in unserem Katalog.' : 'But there are many other paintings in our catalog.'}</p>
								</>
							) : (
								<p>Nothing was found for your request!</p>
							)}
						</div>
						<Link className="error-404__btn btn btn--red btn--universal" to={'/'}>
							{switchBtn ? 'Zum Katalog gehen' : 'Go to the catalog'}
						</Link>
						<Link className="error-404__link more-link" to={'/'}>
							{switchBtn ? 'Zurück zur Hauptseite' : 'Back to the main page'}
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
})

export default Error404;
