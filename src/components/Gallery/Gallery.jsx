import { memo, useEffect, useState, useMemo } from 'react';

import GalleryFilter from './GalleryFilter/GalleryFilter';
import PaintingCard from '../PaintingCard/PaintingCard';
import Pagination from '../Pagination/Pagination';

import PaginateSkeleton from '../../skeletons/paginateSkeleton';
import GallerySkeleton from '../../skeletons/gallerySkeleton';

import './gallery.scss';

const Gallery = memo(({ switchBtn, gallery, authorsData }) => {
	const [filterBtn, setFilterBtn] = useState(0);
	const [dataSelected, setDataSelected] = useState(1);
	const [authorsDataLength, setAuthorsDataLength] = useState(0);
	const [limitLast, setLimitLast] = useState(18);
	const [limitStart, setLimitStart] = useState(18);
	const [loading, setLoading] = useState(false);
	const [loadingWorks, setLoadingWorks] = useState(false);
	const works = [];

	const paintingsInfo = gallery.map((item) => item.works);

	for (const i of paintingsInfo) {
		works.push(...i);
	}

	useMemo(() => {
		setLoadingWorks(true);
		setLimitLast(18 * dataSelected);
		setLimitStart(limitLast - 18);
		setTimeout(() => {
			setLoadingWorks(false);
		}, 1000);
	}, [dataSelected, limitLast]);

	useEffect(() => {
		setAuthorsDataLength(Math.ceil(filterBtn < 1 ? works.length / 18 : filterWorks().length / 18));
	}, [works]);

	const onCurrentPage = (data) => {
		let currentPage = data.selected + 1;
		setDataSelected(currentPage);

		if (data.isNext) {
			setLimitLast(limitLast + 18);
		} else if (data.isPrevious) {
			setLimitLast(limitLast - 18);
		}
	};

	const clickOnFilterBtn = (id) => {
		setFilterBtn(id);
		setLoading(true);
		setLoadingWorks(true);
		setTimeout(() => {
			setLoading(false);
			setLoadingWorks(false);
		}, 1000);
		setDataSelected(1);
	};

	const filterWorks = () => {
		switch (filterBtn) {
			case 0:
				return works.filter((work) => work.category === filterBtn);
			case 1:
				return works.filter((work) => work.category === filterBtn);
			case 2:
				return works.filter((work) => work.category === filterBtn);
			case 3:
				return works.filter((work) => work.category === filterBtn);
			case 4:
				return works.filter((work) => work.category === filterBtn);
			default:
				return works;
		}
	};

	const paintings =
		filterWorks().length > 0
			? filterWorks().slice(limitStart, limitLast)
			: works.slice(limitStart, limitLast);

	return (
		<section className={`gallery`}>
			<h2 className="sr-only">{switchBtn ? 'Autoren Produkte' : 'Author Products'}</h2>
			<div className="container">
				<GalleryFilter
					switchBtn={switchBtn}
					filterBtn={filterBtn}
					clickOnFilterBtn={clickOnFilterBtn}
				/>
				<div
					className="gallery__content"
					style={{
						height: filterBtn > 0 && '1198px',
					}}
				>
					{!loadingWorks ? (
						<>
							<PaintingCard switchBtn={switchBtn} paintingsInfo={paintings} authorsData={authorsData} />
						</>
					) : (
						<div style={{
									height: '1197px'
								}}>
							<div
								className="container"
								style={{
									marginBottom: '30px',
									padding: '0',
									width: '100%',
								}}
							>
								{[...new Array(paintings.length)].map((_, i) => (
									<GallerySkeleton key={i} />
								))}
							</div>
							{loading && <PaginateSkeleton />}
						</div>
					)}
				</div>
				{!loading && (
					<Pagination
						pageChange={ onCurrentPage}
						pageCount={ authorsDataLength}
						dataSelected={ dataSelected}
					/>
				)}
			</div>
		</section>
	);
});

export default Gallery;
