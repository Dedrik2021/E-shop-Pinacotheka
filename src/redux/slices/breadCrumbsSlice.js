import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    breadCrumbsTitle: '',
}

const breadCrumbsSlice = createSlice({
    name: 'breadCrumbs',
    initialState,
    reducers: {
        setBreadCrumbsTitle(state, action) {
            state.breadCrumbsTitle = action.payload
        }
    }
})

export const {setBreadCrumbsTitle} = breadCrumbsSlice.actions
export default breadCrumbsSlice.reducer