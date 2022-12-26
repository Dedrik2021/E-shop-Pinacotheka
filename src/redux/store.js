import { configureStore } from '@reduxjs/toolkit' 
import thunk from 'redux-thunk'

import authorsSlice from './modules/authors/authorsSlice'
import newsSlice from './modules/news/newsSlice'
import usersSlice from './modules/users/usersSlice'
import langBtnsSlice from './slices/langBtnsSlice'
import useModalContentSlice from './slices/modalContentSlice'
import breadCrumbsSlice from './slices/breadCrumbsSlice'

export const store = configureStore({
    reducer: {
        authorsSlice,
        newsSlice,
        usersSlice,
        langBtnsSlice,
        useModalContentSlice,
        breadCrumbsSlice
    },
    
    middleware: [thunk]
})
