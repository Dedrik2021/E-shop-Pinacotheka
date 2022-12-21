import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    switchLanguageBtn: 0
}

const langBtnsDataSlice = createSlice({
    name: "langBtnsSlice",
    initialState,
    reducers: {
        setSwitchLanguageBtn(state, action) {
            state.switchLanguageBtn = action.payload
        }
    }
})

export const {setSwitchLanguageBtn} = langBtnsDataSlice.actions
export default langBtnsDataSlice.reducer