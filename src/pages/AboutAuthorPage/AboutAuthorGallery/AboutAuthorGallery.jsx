import { memo } from 'react';

import PaintingCard from '../../../components/PaintingCard/PaintingCard';
import Pagination from '../../../components/Pagination/Pagination';

import GallerySkeleton from '../../../skeletons/gallerySkeleton';

import './aboutAuthorGallery.scss';

const AboutAuthorGallery = memo((props) => {
	const {
		switchBtn,
		setDataSelected,
		setLimitLast,
		limitLast,
		limitStart,
		dataLength,
		dataSelected,
		paintings,
		loading,
	} = props;

	const onCurrentPage = (data) => {
		let currentPage = data.selected + 1;
		setDataSelected(currentPage);

		if (data.isNext) {
			setLimitLast(limitLast + 16);
		} else if (data.isPrevious) {
			setLimitLast(limitLast - 16);
		}
	};

	return (
		<section className={'about-author-gallery'}>
			<ul className="gallery__list cards-list">
				{!loading
					? paintings.slice(limitStart, limitLast).map((painting) => {
							return (
								<PaintingCard
									key={painting.id}
									switchBtn={switchBtn}
									paintingInfo={painting}
								/>
							);
					})
					: [...new Array(paintings.length).slice(limitStart, limitLast)].map((_, i) => (
						<GallerySkeleton 
                            key={i} 
                            widthCard={320}
                            heightCard={400}
                            imgWidth='300'
                            paddingLeftPrice='235'
                            paddingTopPrice='360'
                        />
					))}
			</ul>

			{dataLength > 1 && (
				<Pagination
					pageChange={onCurrentPage}
					pageCount={dataLength}
					dataSelected={dataSelected}
				/>
			)}
		</section>
	);
});

export default AboutAuthorGallery;
