import { memo } from 'react';
import { Link } from 'react-router-dom';

import Social from '../../../../../components/Social/Social';

const AuthorInfoCard = memo((props) => {
	const { title, tel, id, image } = props;
	
	return (
		<article className="author-card">
			<Link 
				className="author-card__img-link" 
				to={`'/Author/${id}`} 
				// onClick={() => setAuthorInfoBtn(0)}
				>
				<img src={image} alt={title} width="122" height="125" />

				<span className="author-card__online @@online"></span>
			</Link>

			<div className="author-card__box">
				<Link 
					className="author-card__link" 
					to={`'/Author/${id}`} 
					// onClick={() => setAuthorInfoBtn(0)}
					>
					<h2 className="author-card__user">{title}</h2>
				</Link>

				<a className="author-card__link author-card__link--tel" href="tel:@@href">
					{tel}
				</a>

				<Social />
			</div>
		</article>
	);
});

export default AuthorInfoCard;
