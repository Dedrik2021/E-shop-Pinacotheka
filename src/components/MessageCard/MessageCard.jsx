import { memo } from 'react';
import { Link } from 'react-router-dom';

import CaretIcon from '../../assets/sprite/caret-icon.svg';

import './messageCard.scss'

const MessageCard = memo(({message, switchBtn, setItemId, itemId}) => {
	return (
		<li className={`reviews__message`}>
			<article className="user-message">
				<Link
					className="user-message__link"
					// to={`${
					// 	auth.currentUser !== null
					// 		? switchBtn
					// 			? '/PersonlichesBuro'
					// 			: '/PersonalOffice'
					// 		: ''
					// }`}
					// onClick={() => (
					// 	onUserLink(message), auth.currentUser === null && dispatch(setShowModal(true))
					// )}
                    to={''}
				>
					<div className="user-message__img-wrapper">
						<img src={message.avatar} alt={message.name} />
					</div>
				</Link>
				<div className="user-message__wrapper">
					<div className="user-message__wrapper-box">
						<time>
							{message.timeToSend}
							<span className="user-message__slash">/</span>
							<span>{message.data}</span>
						</time>
						<div className="user-message__box">
							<Link
								className="user-message__link user-message__link--name"
								// to={`${
								// 	auth.currentUser !== null
								// 		? switchBtn
								// 			? '/PersonlichesBuro'
								// 			: '/PersonalOffice'
								// 		: ''
								// }`}
                                to={''}
								// onClick={() => (
								// 	onUserLink(message),
								// 	auth.currentUser === null && dispatch(setShowModal(true))
								// )}
							>
								<span>{message.name}</span>
							</Link>
						</div>
					</div>
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
									? `${switchBtn ? 'Alle Nachrichten' : 'All message'}`
									: `${switchBtn ? 'Mehr anzeigen' : 'Show more'}`}
								<svg width="20" height="20">
									<use href={`${CaretIcon}#caret`}></use>
								</svg>
							</button>
						)}
						<button
							className="user-message__delete btn btn--universal"
							// onClick={() => onDeleteMessage(message.id)}
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
