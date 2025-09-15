// src/app/store.js
import { configureStore } from '@reduxjs/toolkit'
import quotesReducer from '../features/quotes/quotesSlice'

const store = configureStore({
  reducer: {
    quotes: quotesReducer
  }
})

export default store
