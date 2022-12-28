import { createSlice } from "@reduxjs/toolkit"

import { fetchAuthorsData } from "./authorsThunks"
import { Status } from "../../../utils/status/status"

const initialState = {
    singlePainting: {},
    authorsData: [],
    authorsDataStatus: Status.LOADING,
}

const authorsInfoSlice = createSlice({
    name: 'authorsSlice',
    initialState,
    reducers: {
        setSinglePainting(state, active) {
            state.singlePainting = active.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthorsData.pending,  (state) => {
                state.authorsData = []
                state.authorsDataStatus = Status.LOADING
            })
            .addCase(fetchAuthorsData.fulfilled, (state, action) => {
                state.authorsData = action.payload
                state.authorsDataStatus = Status.SUCCESS
            })
            .addCase(fetchAuthorsData.rejected, (state) => {
                state.authorsData = []
                state.authorsDataStatus = Status.ERROR
            })
    }
})

export const {setSinglePainting} = authorsInfoSlice.actions

export default authorsInfoSlice.reducer