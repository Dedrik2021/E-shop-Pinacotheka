import { createSlice } from "@reduxjs/toolkit"

import { fetchUsersData } from "./usersThunks"
import { Status } from "../../../utils/status/status"

const initialState = {
    userOfficeDropdown: false,
    foundUser: {},
    usersData: [],
    usersDataStatus: Status.LOADING
}

const usersInfoSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {
        setUserOfficeDropdown(state, action) {
            state.userOfficeDropdown = action.payload
        },
        setFoundUser(state, action) {
            state.foundUser = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersData.pending,  (state) => {
                state.usersData = []
                state.usersDataStatus = Status.LOADING
            })
            .addCase(fetchUsersData.fulfilled, (state, action) => {
                state.usersData = action.payload
                state.usersDataStatus = Status.SUCCESS
            })
            .addCase(fetchUsersData.rejected, (state) => {
                state.usersData = []
                state.usersDataStatus = Status.ERROR
            })
    }
})

export const {setUserOfficeDropdown, setFoundUser} = usersInfoSlice.actions

export default usersInfoSlice.reducer