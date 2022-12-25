import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchData } from '../../../services/data/getData/getUrls';

export const fetchNewsData = createAsyncThunk('newsData/newsDataStatus', async () => {
    return fetchData('news')
});