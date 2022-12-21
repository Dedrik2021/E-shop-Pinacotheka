import { createSlice } from "@reduxjs/toolkit"

import { fetchNewsData } from "./newsThunks"
import { Status } from "../../../utils/status/status"

const initialState = {
    newsData: [],
    newsDataStatus: Status.LOADING
}

const newsInfoSlice = createSlice({
    name: 'newsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewsData.pending,  (state) => {
                state.newsData = []
                state.newsDataStatus = Status.LOADING
            })
            .addCase(fetchNewsData.fulfilled, (state, action) => {
                state.newsData = action.payload
                state.newsDataStatus = Status.SUCCESS
            })
            .addCase(fetchNewsData.rejected, (state) => {
                state.newsData = []
                state.newsDataStatus = Status.ERROR
            })
    }
})

export default newsInfoSlice.reducer