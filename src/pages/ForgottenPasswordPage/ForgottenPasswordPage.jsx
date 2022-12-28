import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import img from '../../assets/images/forgotten-password_img.png';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';

import { setBreadCrumbsTitle } from '../../redux/slices/breadCrumbsSlice';

import './forgottenPasswordPage.scss'

const ForgottenPasswordPage = () => {

    const dispatch = useDispatch()
	const switchLanguageBtn = useSelector((state) => state.langBtnsSlice.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;

    useEffect(() => {
		dispatch(setBreadCrumbsTitle(''));
		const pathName = window.location.pathname.substring(1, 20);
		const name = pathName.split('/');
		dispatch(setBreadCrumbsTitle(name));
	}, [dispatch]);

	return (
		<>
			<h1 className="sr-only">Passwort vergessen</h1>
			<div className="forgotten-password__bg"></div>
            <div className='container'>
                <BreadCrumbs/>
            </div>
			<section className="forgotten-password">
				<div className="container">
					<div className="forgotten-password__inner">
						<div className="forgotten-password__box">
							<h2 className="forgotten-password__title title">{switchBtn ? 'Hast du dein Passwort vergessen?' : 'Have you forgotten your password'}</h2>
							<div>
								<p>
									{switchBtn ? 'Dann gib deine E-Mail-Adresse ein und wir senden Ihnen Informationen zur Passwortwiederherstellung.' : 
									'Then enter your email address and we will send you password recovery information.'}
								</p>
							</div>
							<form className="forgotten-password__form">
								<label className="forgotten-password__label" htmlFor="forgotten-password__email">
									<span className="sr-only">Email</span>
								</label>
								<input
									className="forgotten-password__input"
									type="email"
									placeholder="Email"
									name="[senden]email"
									id="forgotten-password__email"
									required
								/>

								<button className="forgotten-password__btn btn--universal btn--red btn" type="submit">
									Senden
								</button>
							</form>
						</div>
						<div className="forgotten-password__img" style={{ backgroundImage: `url(${img})` }}></div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ForgottenPasswordPage;
