import { memo } from 'react';
import {Link} from 'react-router-dom'

import unknowImg from '../../assets/images/unknow-photo.png';

import './authorCard.scss'

const AuthorCard = memo(({item, switchBtn}) => {
	return (
		<li className="authors-list__item" key={item.id}>
			<article className="author-card">
				<Link
					className="author-card__img-link"
					to={`${switchBtn ? '/Autor' : '/Author'}/${item.id}`}
					// onClick={() => dispatch(setAuthorInfoBtn(0))}
				>
					<img
						src={item.img !== undefined ? item.img : unknowImg}
						alt={item.title}
						width="122"
						height="125"
					/>

					<span className="author-card__portfolio">{item.works.length}</span>

					<span
						className={`author-card__online`}
						// ${
						// 	foundUser !== undefined &&
						// 	item.emailId === foundUser.emailId
						// 		? 'active'
						// 		: ''
						// }
					></span>
				</Link>

				<div className="author-card__box">
					<Link
						className="author-card__link"
						to={`${switchBtn ? '/Autor' : '/Author'}/${item.id}`}
						// onClick={() => dispatch(setAuthorInfoBtn(0))}
					>
						<h2 className="author-card__user">{item.title}</h2>
					</Link>
				</div>
			</article>
		</li>
	);
});

export default AuthorCard;
