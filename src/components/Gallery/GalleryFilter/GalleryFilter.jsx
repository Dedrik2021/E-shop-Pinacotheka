import { memo } from 'react';

import './galleryFilter.scss'

const GalleryFilter = memo((props) => {
	const { switchBtn, filterBtn, clickOnFilterBtn } = props;

	const filterBtns = [
		{ id: 0, title: switchBtn ? 'Aller' : 'All' },
		{ id: 1, title: switchBtn ? 'Neue Dinge' : 'New things' },
		{ id: 2, title: switchBtn ? 'Empfohlen' : 'Recommend' },
		{ id: 3, title: switchBtn ? 'Beliebt' : 'Popular' },
		{ id: 4, title: switchBtn ? 'Rabatte' : 'Discount' },
	];

	return (
		<ul className="gallery-filters">
			{filterBtns.map(({ title, id }) => {
				return (
					<li className="gallery-filters__item" key={id}>
						<button
							className={`gallery-filters__btn btn btn--universal 
                    		${filterBtn === id ? 'active' : ''}`}
							data-filter="all"
							type="button"
							onClick={() => clickOnFilterBtn(id)}
						>
							{title}
						</button>
					</li>
				);
			})}
		</ul>
	);
});

export default GalleryFilter;
