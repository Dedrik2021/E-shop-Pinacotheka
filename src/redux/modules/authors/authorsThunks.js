import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs, collection, query, orderBy } from "firebase/firestore/lite";

import { fetchData } from '../../../services/data/getData/getUrls';

import { database } from "../../../firebase/firebaseConfig";

export const fetchAuthorsData = createAsyncThunk('authorsData/authorsDataStatus', async () => {
	// const collectionRef = collection(database, 'authors')
	// const collectionQuery = query(collectionRef, orderBy('id', 'asc'));
	// const data = await getDocs(collectionQuery);
	// const authorsData = data.docs.map((item) => {
	// 	return {...item.data(), ID: item.id};
	// });
	// return authorsData

    // const url = `http://localhost:3001/items`
    // const data = 'Authors data'

    return fetchData('authors')
});
