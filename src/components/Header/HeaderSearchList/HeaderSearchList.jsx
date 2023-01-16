import { memo, useEffect } from 'react';
import { Transition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { ref, update } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';

import unknowImg from '../../../assets/images/unknow-photo.png';
import { realDb } from '../../../firebase/firebaseConfig';
import HeaderSearchListSkeleton from '../../../skeletons/headerSearchListSkeleton';

import { setPaintingWatched } from '../../../redux/modules/authors/authorsSlice';

import './headerSearchList.scss';

const HeaderSearchList = memo((props) => {
	const { searchInput, filteredBySearch, clearSearchInput, search, loading } = props

	const dispatch = useDispatch()
	const duration = 350;
	const { paintingWatched } = useSelector((state) => state.authorsSlice);

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

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [])

	const clickOnPainting = (data) => {
		const docToUpdates = ref(realDb, `singlePainting`);
		update(docToUpdates, {
			authorEmailId: data.emailId,
		}).catch((err) => {
			alert(err.message);
		});
		const filteredPainting = paintingWatched.filter(item => item.img !== data.img)
		dispatch(setPaintingWatched([data, ...filteredPainting]))
		clearSearchInput()
		window.scrollTo(0, 0);
	};

	const serchData = () => {
		if (!loading) {

			if (filteredBySearch.length !== 0) {
				return filteredBySearch.map((data) => {
					return (
						<li className="search-list__item" key={data.ID}>
							<Link 
								className="search-list__link" 
								to={`${data.page}${data.id}`}
								onClick={() => clickOnPainting(data)}
							>
								<img src={data.image ? data.image : unknowImg} alt={data.title} />
								<span>{data.title}</span>
							</Link>
						</li>
					);
				});
			} else {
				return <p className="search-list__message">Nothing was found for your request!</p>;
			}
		} else {
			return ([...new Array(filteredBySearch.length !== 0 ? filteredBySearch.length : 1)].map((_, i) => (
				<HeaderSearchListSkeleton key={i} filteredBySearchLength={filteredBySearch.length} />
			)))
		}
	};

	return (
		<Transition timeout={duration} in={search ? true : false} unmountOnExit>
			{(state) => (
				<ul
					className={`search-list ${ search && 'active'}`}
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
