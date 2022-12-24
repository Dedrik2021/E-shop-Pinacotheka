import { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

import AuthorCard from '../AuthorCard/AuthorCard';

import AuthorsBlockSkeleton from '../../skeletons/authorsBlockSkeleton';


import './authors.scss'

const Authors = memo(({authorsData, switchBtn}) => {
	// const [authors, setAuthors] = useState([]);
	// const auth = getAuth();
	// const dispatch = useDispatch();
	// const modal = useSelector((state) => state.authorsInfos.modal);
	// const { authors, authorsStatus } = useSelector((state) => state.authorsInfos);
	// const foundUser = useSelector((state) => state.user.foundUser);

	// console.log(authors);
	// const userOnline = authors.find
	// useEffect(() => {
	// 	const getAuthors = async () => {
	// 		try {
	// 			const response = await fetch(`http://localhost:3001/items?_limit=11`);
	// 			const data = await response.json();
	// 			setAuthors(data);
	// 			return data;
	// 		} catch (error) {console.log(error);}
	// 	};
	// 	getAuthors();
	// }, []);

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
                                />
								
							);
						})}
					</ul>
					<Link
						className="authors-list__btn btn btn--red-hover"
						to={switchBtn ? `/Autoren` : '/Authors'}
					>
						Aussehen alle Autoren
					</Link>
				</div>
			</div>
		</div>
	);
});

export default Authors;
