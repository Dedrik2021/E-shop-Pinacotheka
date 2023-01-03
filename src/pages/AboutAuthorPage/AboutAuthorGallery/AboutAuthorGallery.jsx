import { memo } from 'react';
import Helmet from 'react-helmet';

import PaintingCard from '../../../components/PaintingCard/PaintingCard';
import Pagination from '../../../components/Pagination/Pagination';
import PaintingAttention from '../../../components/PaintingAttention/PaintingAttention';

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
		author
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
		<>
			<Helmet>
				<meta
					name="description"
					content={switchBtn ? `Werke von ${author.title}` : `Works by ${author.title}`}
				/>
				<title>{switchBtn ? `Werke von ${author.title}` : `Works by ${author.title}`}</title>
			</Helmet>
			<section className={'about-author-gallery'}>
				<span className='sr-only'></span>
				{paintings.length > 0 ? (
					<>
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
								: [...new Array(paintings.length).slice(limitStart, limitLast)].map(
										(_, i) => (
											<GallerySkeleton
												key={i}
												widthCard={320}
												heightCard={400}
												imgWidth="300"
												paddingLeftPrice="235"
												paddingTopPrice="360"
											/>
										),
								)}
						</ul>

						{dataLength > 1 && (
							<Pagination
								pageChange={onCurrentPage}
								pageCount={dataLength}
								dataSelected={dataSelected}
							/>
						)}
					</>
				) : (
					<PaintingAttention
						title="no works"
						attention1="We are very sorry!"
						attention2="This author has no works yet."
						marginTop="0"
					/>
				)}
			</section>
		</>
	);
});

export default AboutAuthorGallery;
