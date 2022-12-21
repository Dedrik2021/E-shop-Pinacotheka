import { memo, useEffect, useState } from 'react';
import { collection, query, orderBy, startAfter, limit, getDocs, startAt, doc, getDoc, lastDocs } from "firebase/firestore/lite";

import GalleryFilter from './GalleryFilter/GalleryFilter';
import PaintingCard from '../PaintingCard/PaintingCard';
import Pagination from '../Pagination/Pagination';
import { database } from '../../firebase/firebaseConfig';

import './gallery.scss';

const Gallery = memo(({ switchBtn }) => {
	const [filterBtn, setFilterBtn] = useState(0);
	const [pageCount, setPageCount] = useState(1);
	const [dataSelected, setDataSelected] = useState(1);
	const [authors, setAuthors] = useState([])
	const [authorsLength, setAuthorsLength] = useState(0)
	const [lastDocs, setLastDocs] = useState();
	const works = []

	const collectionRef = collection(database, "authors")

	useEffect(() => {
		getData();
		window.scrollTo(0, 0);
	}, []);

	const getData = async () => {
		const collectionQuery = query(collectionRef, orderBy('id', 'desc'), limit(18));
		updateState(collectionQuery);
	};


	const updateState = async (collectionQuery) => {
		// setLoading(true);
		const data = await getDocs(collectionQuery);
		const authorsData = data.docs.map((item) => {
			return item.data();
		});
		const lastDoc = data.docs[data.docs.length - 1];
		setAuthors(authorsData);
		setLastDocs(lastDoc);

		const total = await getDocs(collectionRef);
		const totalLength = total.docs.map((item) => {
			return item.data();
		});
		// setNewsLength(totalLength.length);
		setPageCount(Math.ceil(totalLength.length / 18));
		// setLoading(false);
		return authorsData;
	};

	console.log(authors);

	const onCurrentPage = (authorsData) => {
		let currentPage = authorsData.selected + 1;
		setDataSelected(currentPage);

		if (authorsData.isNext) {
			const collectionQuery = query(collectionRef, orderBy('id', 'asc'), startAfter(lastDocs), limit(18));
			updateState(collectionQuery);
		} else if (authorsData.isPrevious) {
			//??????????????????????????????
		}
	};

	const paintingsInfo = authors.map(item => item.works)


	for (const i of paintingsInfo) {
		works.push(...i);
	}
	useEffect(() => {
	
		setAuthorsLength(Math.ceil(works.length / 18))
	}, [authors])

	const filterWorks = () => {
		switch (filterBtn) {
			case 0:
				return works.filter(work => work.category === filterBtn)
			case 1:
				return works.filter(work => work.category === filterBtn)
			case 2:
				return works.filter(work => work.category === filterBtn)
			case 3:
				return works.filter(work => work.category === filterBtn)
			case 4:
				return works.filter(work => work.category === filterBtn)
			default:
				return works
		}
	};

	const paintings = filterWorks().length > 0 ? filterWorks() : works

	return (
		<section className={`gallery`}>
			<h2 className="sr-only">{switchBtn ? 'Autoren Produkte' : 'Author Products'}</h2>
			<div className="container">
				<div className="gallery__content">
					<GalleryFilter
						switchBtn={switchBtn}
						filterBtn={filterBtn}
						clickOnFilterBtn={setFilterBtn}
					/>
					{/* <ul className="gallery__list cards-list"> */}
					<PaintingCard 
						switchBtn={switchBtn} 
						paintingsInfo={paintings} 
					/>
					{/* {content} */}
					{/* {errorMessage} */}
					{/* </ul> */}
					<Pagination 
						pageChange={onCurrentPage} 
						pageCount={authorsLength} 
						dataSelected={dataSelected}
					/>
				</div>
			</div>
		</section>
	);
});

export default Gallery;
