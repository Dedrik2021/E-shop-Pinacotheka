import { useSelector } from 'react-redux';

import Logo from '../../UI/logo/Logo';

import logo from '../../assets/images/logo-2.svg'
import bg from '../../assets/images/descr-bg.jpg'

import './description.scss'

const Description = () => {
    
    const switchLanguageBtn = useSelector((state) => state.langBtnsSlice.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;

    const descrText = [
        {
            text: switchBtn ? "Dieser Text trägt keine semantische Last, sondern ist nur eine Nachahmung des Füllens der Textblöcke der Site. Dieser Text trägt keine semantische Last, sondern ist nur eine Nachahmung des Füllens der Text löcke der Site. Dieser Text trägt keine semantische Last sondern ist nur eine Nachahmung des Füllens der Textblöcke der Site. Dieser Text trägt keine semantische Last, sondern ist nur eine Nachahmung des Füllens der Textblöcke der Site." : 
            'This text does not carry a semantic load, but is just an imitation of filling the text blocks of the site. This text does not carry a semantic load, but is just an imitation of filling the text holes of the site. This text does not carry a semantic load, but is just an imitation of filling the text blocks of the site. This text does not carry a semantic load, but is just an imitation of filling the text blocks of the site.'
        },
        {
            text: switchBtn ? 'Dieser Text trägt keine semantische Last, sondern ist nur eine Nachahmung des Füllens der Textblöcke der Site. Dieser Text trägt keine semantische Last, sondern ist nur eine Nachahmung des Füllens der Textblöcke der Site. Dieser Text trägt keine semantische Last sondern ist nur eine Nachahmung des Füllens der Textblöcke der Site. Dieser Text trägt keine semantische Last, sondern ist nur eine Nachahmung des Füllens der Textblöcke der Site.' : 
            'This text does not carry a semantic load, but is just an imitation of filling the text blocks of the site. This text does not carry a semantic load, but is just an imitation of filling the text holes of the site. This text does not carry a semantic load, but is just an imitation of filling the text blocks of the site. This text does not carry a semantic load, but is just an imitation of filling the text blocks of the site.'
        },
        {
            text: switchBtn ? 'Dieser Text trägt keine semantische Last, sondern ist nur eine Nachahmung des Füllens der Textblöcke der Site. Dieser Text trägt keine semantische Last, sondern ist nur eine Nachahmung des Füllens der Textblöcke der Site.' : 
            'This text does not carry a semantic load, but is just an imitation of filling the text blocks of the site. This text does not carry a semantic load, but is just an imitation of filling the text holes of the site. '
        }
    ]

	return (
		<div className={`descr`} style={{backgroundImage: `url(${bg})`}}>
			<div className="container container--lg">
				<div className="descr__content">
                    <Logo
                        img={logo}
                        width={340}
                        height={95}
                        styles={{position: 'relative', top: '130px', marginRight: '105px'}}
                    />
					<div className="descr__text">
						{descrText.map((item, i) => {
                            return <p key={i}>{item.text}</p>
                        })}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Description;
