import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './headerDropdown.scss'

const HeaderDropdown = () => {
	const switchLanguageBtn = useSelector(state => state.langBtnsSlice.switchLanguageBtn)
	const switchBtn = switchLanguageBtn[0] === 0

	const linkBtns = [
		{
			id: 0,
			title: switchBtn ? 'Kreationen' : 'Creations',
			src: '#',
		},
		{
			id: 1,
			title: switchBtn ? 'Nachrichten' : 'News',
			src: switchBtn ? '/Nachrichten' : '/News',
		},
		{
			id: 2,
			title: switchBtn ? 'Über das Projekt' : 'About this project',
			src: '#',
		},
		{
			id: 3,
			title: 'Error-404',
			src: '/Error-404',
		},
		{
			id: 4,
			title: 'FAQ',
			src: '#',
		},
		{
			id: 5,
			title: switchBtn ? 'Nutzungsbedingungen' : 'Terms and Conditions',
			src: '#',
		},
		{
			id: 6,
			title: switchBtn ? 'Für Autoren' : 'For authors',
			src: '#',
		},
		{
			id: 7,
			title: switchBtn ? 'Garantien' : 'Guarantees',
			src: '#',
		},
		{
			id: 8,
			title: switchBtn ? 'Kontakte' : 'Contacts',
			src: '#',
		},
		{
			id: 9,
			title: switchBtn ? 'Passwort vergessen' : 'Forgot your password',
			src: switchBtn ? '/PasswortVergessen' : '/ForgotYourPassword',
		},
		{
			id: 10,
			title: switchBtn ? 'Nachrichten erstellen' : 'Create news',
			src: switchBtn ? '/Nachrichten/NachrichtenErstellen' : '/News/CreateNews',
		},
	];

	return (
		<ul className="menu-dropdown">
			{linkBtns.map(({ id, title, src }) => (
				<li className="menu-dropdown__item" key={id}>
					<Link className="menu-dropdown__link" to={src}>
						{title}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default HeaderDropdown;
