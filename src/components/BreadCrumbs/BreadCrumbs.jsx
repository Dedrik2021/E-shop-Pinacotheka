import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { setBreadCrumbsTitle } from '../../redux/slices/breadCrumbsSlice';

import { fetchAuthorsData } from '../../redux/modules/authors/authorsThunks';

import './breadCrumbs.scss'

const BreadCrumbs = () => {
	const {id} = useParams()
	const dispatch = useDispatch();

	const breadCrumbsTitle = useSelector((state) => state.breadCrumbsSlice.breadCrumbsTitle);
	const switchLanguageBtn = useSelector((state) => state.langBtnsSlice.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;

	const clickCleanBreadCrumbsTitle = () => {
		dispatch(setBreadCrumbsTitle(''))
	}

	const getBreadCrumbs = (breadCrumbsTitle) => {

		if (breadCrumbsTitle.length > 1) {
			return breadCrumbsTitle.map((item) => {
				return (
					<li className="breadcrumbs__item" key={item}>
						<Link
							onClick={clickCleanBreadCrumbsTitle}
							className="breadcrumbs__link"
							to={(breadCrumbsTitle[0].startsWith('N') || breadCrumbsTitle[0].startsWith('A')) ? `/${breadCrumbsTitle[0]}` : `/${breadCrumbsTitle[0]}/${id}`}
						>
							{item}
						</Link>
					</li>
				);
			});
		} else {
			return (
				<li className="breadcrumbs__item">
					<Link onClick={() => dispatch(fetchAuthorsData())} className="breadcrumbs__link" to={``}>
						{breadCrumbsTitle}
					</Link>
				</li>
			)
		}
	};

	return (
		<ul className="breadcrumbs">
			<li className="breadcrumbs__item">
				<Link 
					className="breadcrumbs__link" 
					to={'/'}
				>
					{switchBtn ? 'Heimat' : 'Home'}
				</Link>
			</li>
			{getBreadCrumbs(breadCrumbsTitle)}
		</ul>
	);
};

export default BreadCrumbs;
