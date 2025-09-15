import { configureStore } from '@reduxjs/toolkit'
import quotesReducer from './quotesSlice'

export const store = configureStore({
  reducer: {
    quotes: quotesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export default store