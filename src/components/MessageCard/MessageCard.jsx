import { memo, useState } from 'react';

import CaretIcon from '../../assets/sprite/caret-icon.svg';
import unknownImage from '../../assets/images/unknow-photo.png';

import './messageCard.scss';

const MessageCard = memo(({ message, switchBtn, clickRemoveMessage, foundUser, styles }) => {
	const [messageId, setMessageId] = useState({ id: null, open: false });

	const onShowMoreBtn = (id) => {
		if (messageId.id === id) {
			setMessageId({ id: id, open: !messageId.open });
		} else {
			setMessageId({ id: id, open: true });
		}
	};

	const dateYestarday = (day) => {
		var n = new Date();
		n.setDate(n.getDate() + day);
		return n.toLocaleDateString();
	}

	return (
		<li className={`reviews__message`} style={styles}>
			<article className="user-message">

				<span className="user-message__link">
					<div className="user-message__img-wrapper">
						<img
							src={message.avatar !== '' ? message.avatar : unknownImage}
							alt={message}
						/>
					</div>
				</span>
				<div className="user-message__wrapper">
					<time>
						{message.timeToSend}
						<span className="user-message__slash">/</span>
						<span>
							{message.date === new Date().toLocaleDateString()
								? dateYestarday(-1) === message.date ? 'Yestarday' : 'Today'
								: message.date}
						</span>
					</time>
					<div className="user-message__wrapper-box"></div>
					<span className="user-message__name">{message.name.user}</span>
					<div className="user-message__text">
						<p
							className={
								messageId.open && messageId.id === message.id ? 'active' : ''
							}
						>
							{message.message}
						</p>
					</div>
					<div className="user-message__wrapper-btns">
						{message.message.length > 300 && (
							<button
								className={`user-message__btn btn btn--universal btn--red ${
									messageId.open && messageId.id === message.id ? 'active' : ''
								}`}
								type="button"
								onClick={onShowMoreBtn.bind(this, message.id)}
							>
								{messageId.open && messageId.id === message.id
									? `${switchBtn ? 'Weniger anzeigen' : 'Show less'}`
									: `${switchBtn ? 'Mehr anzeigen' : 'Show more'}`}
								<svg width="20" height="20">
									<use href={`${CaretIcon}#caret`}></use>
								</svg>
							</button>
						)}
						<button
							className="user-message__delete btn btn--universal"
							onClick={clickRemoveMessage.bind(this, message.id)}
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
