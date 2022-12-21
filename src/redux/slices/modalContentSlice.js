import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	modalSwitchBtn: 0,
	showModal: false
};

const modalContentSlice = createSlice({
	name: 'useModalContentSlice',
	initialState,
	reducers: {
		setModalSwitchBtn(state, action) {
			state.modalSwitchBtn = action.payload;
		},
		setShowModal(state, action) {
			state.showModal = action.payload;
		}
	},
});

export const { setModalSwitchBtn, setShowModal } = modalContentSlice.actions;
export default modalContentSlice.reducer;
