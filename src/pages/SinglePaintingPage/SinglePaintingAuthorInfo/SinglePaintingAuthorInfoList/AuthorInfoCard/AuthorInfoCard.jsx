import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Social from '../../../../../components/Social/Social';

import { setAboutAuthorSwitchContentBtn } from '../../../../../redux/modules/authors/authorsSlice';

const AuthorInfoCard = memo((props) => {
	const { title, tel, id, image } = props;
	const dispatch = useDispatch()
	
	return (
		<article className="author-card">
			<Link 
				className="author-card__img-link" 
				to={`/Authors/AuthorInfo/${id}`} 
				onClick={() => dispatch(setAboutAuthorSwitchContentBtn(0))}
				>
				<img src={image} alt={title} width="122" height="125" />

				<span className="author-card__online @@online"></span>
			</Link>

			<div className="author-card__box">
				<Link 
					className="author-card__link" 
					to={`/Authors/AuthorInfo/${id}`} 
					onClick={() => dispatch(setAboutAuthorSwitchContentBtn(0))}
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
