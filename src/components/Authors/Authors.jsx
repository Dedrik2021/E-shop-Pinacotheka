import { memo } from 'react';
import { Link } from 'react-router-dom';

import AuthorCard from '../AuthorCard/AuthorCard';

import './authors.scss'

const Authors = memo(({authorsData, switchBtn, foundUser}) => {

	return (
		<div className={`authors-list `}>
			<div className="container">
				<span className="authors-list__title title">
					{switchBtn ? 'Autoren' : 'Authors'}
				</span>
				<div className="authors-list__content">
					<ul className="authors-list__list">
						{authorsData.slice(0, 11).map((item) => {
							return (
                                <AuthorCard
                                    key={item.id}
                                    switchBtn={switchBtn}
                                    item={item}
									foundUser={foundUser}
                                />
								
							);
						})}
					</ul>
					<Link
						className="authors-list__btn btn btn--red-hover"
						to={switchBtn ? `/Autoren` : '/Authors'}
					>
						{switchBtn ? 'Aussehen alle Autoren' : 'Show all authors'}
					</Link>
				</div>
			</div>
		</div>
	);
});

export default Authors;
