import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';

import { setBreadCrumbsTitle } from '../../redux/slices/breadCrumbsSlice';


const AboutAuthorPage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const auth = getAuth();

	useEffect(() => {
		dispatch(setBreadCrumbsTitle(''));
		const pathName = window.location.pathname.substring(1, 7);
		const name = pathName.split('/');
		dispatch(setBreadCrumbsTitle(name));
	}, [dispatch]);

	return (
		<div className="container">
			<BreadCrumbs />
			<div className={`about-author`}>
				<div className={`about-author__inner`}>
					<div className={`about-author__shadow`}></div>
					<div className="about-author__aside">
						{/* <ul className="authors-items__list">
							{aboutBtn.map(({ id, title }) => {
								return (
									<li className="authors-items__item" key={id}>
										<button
											className={`authors-items__btn btn btn--red btn--universal ${
												authorInfoBtn === id ? 'btn--active' : ''
											}`}
											type="button"
											onClick={() => dispatch(setAuthorInfoBtn(id))}
										>
											{title}
										</button>
									</li>
								);
							})}
						</ul> */}
					</div>
					{/* {showContent()} */}
				</div>
			</div>
		</div>
	);
};

export default AboutAuthorPage;
