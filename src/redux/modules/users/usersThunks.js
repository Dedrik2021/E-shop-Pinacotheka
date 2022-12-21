import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchData } from '../../../services/data/getData/getUrls';

export const fetchUsersData = createAsyncThunk('usersData/usersDataStatus', async () => {
	// const collectionRef = collection(database, 'authors')
	// const collectionQuery = query(collectionRef, orderBy('id', 'asc'));
	// const data = await getDocs(collectionQuery);
	// const authorsData = data.docs.map((item) => {
	// 	return {...item.data(), ID: item.id};
	// });
	// return authorsData

    // const url = 'http://localhost:3001/users'
    // const error = 'Users data'

    return fetchData('users')
});