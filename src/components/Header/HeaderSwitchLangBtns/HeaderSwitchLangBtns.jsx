import {memo} from 'react'
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'

import { languageBtns } from './../btns/languageBtns'

import './headerSwitchLangBtns.scss'

const HeaderSwitchLangBtns = memo(({changeLang}) => {
    const navigate = useNavigate()

	const switchLanguageBtn = useSelector(state => state.langBtnsSlice.switchLanguageBtn)
	const switchBtn = switchLanguageBtn[0]

	const clickOnLanguageBtn = (id) => {
		changeLang(id) 
		navigate('/')
	}

	return (
		<ul className="language-switcher">
			{languageBtns.map(({ id, title }) => (
				<li className="language-switcher__item" key={id}>
					<button
						className={`language-switcher__btn btn ${
							switchBtn === id ? 'active' : ''
						}`}
						type="button"
						onClick={() => clickOnLanguageBtn(id)}
					>
						{title}
					</button>
				</li>
			))}
		</ul>
	);
})

export default HeaderSwitchLangBtns;
