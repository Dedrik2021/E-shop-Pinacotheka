import { memo } from 'react';

import CaretIcon from '../../assets/sprite/caret-icon.svg';
import unknownImage from '../../assets/images/unknow-photo.png';

import './messageCard.scss';

const MessageCard = memo(({ message, switchBtn, setItemId, itemId, clickRemoveMessage }) => {
	return (
		<li className={`reviews__message`}>
			<article className="user-message">
				<span className="user-message__link">
					<div className="user-message__img-wrapper">
						<img
							src={message.avatar !== '' ? message.avatar : unknownImage}
							alt={message.name}
						/>
					</div>
				</span>
				<div className="user-message__wrapper">
					<time>
						{message.timeToSend}
						<span className="user-message__slash">/</span>
						<span>{message.date}</span>
					</time>
					<div className="user-message__wrapper-box"></div>
					<span className="user-message__name">{message.name}</span>
					<div className="user-message__text">
						<p className={itemId === message.id ? 'active' : ''}>{message.message}</p>
					</div>
					<div className="user-message__wrapper-btns">
						{message.message.length > 300 && (
							<button
								className={`user-message__btn btn btn--universal btn--red ${
									itemId === message.id ? 'active' : ''
								}`}
								type="button"
								onClick={() => setItemId(message.id)}
							>
								{itemId === message.id
									? `${switchBtn ? 'Weniger anzeigen' : 'Show less'}`
									: `${switchBtn ? 'Mehr anzeigen' : 'Show more'}`}
								<svg width="20" height="20">
									<use href={`${CaretIcon}#caret`}></use>
								</svg>
							</button>
						)}
						<button
							className="user-message__delete btn btn--universal"
							onClick={() => clickRemoveMessage(message.id)}
							type={'button'}
						>
							Delete
						</button>
					</div>
				</div>
			</article>
		</li>
	);
});

export default MessageCard;
