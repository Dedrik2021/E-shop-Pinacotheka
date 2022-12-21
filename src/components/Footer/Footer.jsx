import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import logo from '../../assets/images/logo-2.svg';
import Social from '../Social/Social';
import Logo from '../../UI/logo/Logo';

import '../Footer/footer.scss'

const Footer = () => {
	const switchLanguageBtn = useSelector(state => state.langBtnsSlice.switchLanguageBtn)
	const switchBtn = switchLanguageBtn[0] === 0

	const linksBtns = [
		{ id: 0, title: switchBtn ? 'Kreationen' : 'Creations', src: '' },
		{ id: 1, title: switchBtn ? 'Nachrichten' : 'News', src: '' },
		{ id: 2, title: switchBtn ? 'Über das Projekt' : 'About this project', src: '' },
		{ id: 3, title: 'Error-404', src: '' },
		{ id: 4, title: 'FAQ', src: '' },
		{ id: 5, title: switchBtn ? 'Nutzungsbedingungen' : 'Terms and Conditions', src: '' },
		{ id: 6, title: switchBtn ? 'Für Autoren' : 'For authors', src: '' },
		{ id: 7, title: switchBtn ? 'Garantien' : 'Guarantees', src: '' },
		{ id: 8, title: switchBtn ? 'Kontakte' : 'Contacts', src: '' },
	];

	return (
		<footer className={`footer`}>
			<div className="container">
				<div className="footer__content">
					<div className="footer__box">
						<Link className="logo footer__logo" to={'/'}>
							<Logo img={logo} width={'170'} height={'45'}/>
						</Link>
						<span className="footer__copy">
						{switchBtn ? '2020 Alle Rechte vorbehalten' : '2020 All Rights reserved'}
						</span>
						<Link className="footer__box-link" to="#">
						{switchBtn ? 'Datenschutz-Bestimmungen' : 'Privacy Policy'}
						</Link>
					</div>
					<ul className="footer__list">
						{linksBtns.map(({ id, title, src }) => (
							<li key={id} className="footer__item">
								<Link className="footer__link" to={src}>
									{title}
								</Link>
							</li>
						))}
					</ul>
					<div className="footer__wrapper">
						<a className="footer__tel" href="tel:+498924214970">
							+4 98 924 214 975
						</a>
						<Social/>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
