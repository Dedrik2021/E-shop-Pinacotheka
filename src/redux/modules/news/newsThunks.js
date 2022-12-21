import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchData } from '../../../services/data/getData/getUrls';

export const fetchNewsData = createAsyncThunk('newsData/newsDataStatus', async () => {
	// const collectionRef = collection(database, 'authors')
	// const collectionQuery = query(collectionRef, orderBy('id', 'asc'));
	// const data = await getDocs(collectionQuery);
	// const authorsData = data.docs.map((item) => {
	// 	return {...item.data(), ID: item.id};
	// });
	// return authorsData

    // const url = 'http://localhost:3001/news'
    // const data = 'News data'

    return fetchData('news')
});