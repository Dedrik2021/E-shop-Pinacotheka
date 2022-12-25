import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchData } from '../../../services/data/getData/getUrls';

export const fetchAuthorsData = createAsyncThunk('authorsData/authorsDataStatus', async () => {
    return fetchData('authors')
});
