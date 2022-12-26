import { memo } from 'react';
import { Transition } from 'react-transition-group';
import { Link } from 'react-router-dom';

import unknowImg from '../../../assets/images/unknow-photo.png'

import './headerSearchList.scss';

const HeaderSearchList = memo(({ searchInput, filteredBySearch }) => {
	const duration = 0;

	const defaultStyle = {
		transition: `all ${duration}ms ease-in-out`,
		opacity: 0,
		visibility: 'hidden',
	};

	const transitionStyles = {
		entering: { opacity: 1, visibility: 'visible' },
		entered: { opacity: 1, visibility: 'visible' },
		exiting: { opacity: 0, visibility: 'hidden' },
		exited: { opacity: 0, visibility: 'hidden' },
	};

	const serchData = () => {
		if (filteredBySearch.length !== 0) {
			return (
				filteredBySearch.map((data, i) => {
					return (
						<li className="search-list__item" key={i}>
							<Link className="search-list__link" to={`/${data.section}/${data.id}`}>
								<img src={data.img ? data.img : unknowImg} alt={data.title} />
								<span>{data.title}</span>
							</Link>
						</li>
					);
				})
			)
		} else {
			return <p className='search-list__message'>Nothing was found for your query!</p>
		}
	}

	return (
		<Transition timeout={duration} in={searchInput.val ? true : false} unmountOnExit>
			{(state) => (
				<ul
					className="search-list"
					style={{
						...defaultStyle,
						...transitionStyles[state],
					}}
				>
					{serchData()}
				</ul>
			)}
		</Transition>
	);
});

export default HeaderSearchList;
