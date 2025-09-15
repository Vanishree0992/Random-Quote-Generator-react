// src/features/quotes/quotesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunk for fetching random quote
export const fetchRandomQuote = createAsyncThunk(
  'quotes/fetchRandom',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://dummyjson.com/quotes')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const quotes = data.quotes

      if (!Array.isArray(quotes) || quotes.length === 0) {
        throw new Error('No quotes found.')
      }

      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

      return {
        text: randomQuote.quote,
        author: randomQuote.author,
        id: randomQuote.id
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch quote.')
    }
  }
)

const quotesSlice = createSlice({
  name: 'quotes',
  initialState: {
    currentQuote: null,
    isLoading: false,
    error: null,
    favorites: JSON.parse(localStorage.getItem('favoriteQuotes') || '[]'),
    quotesHistory: []
  },
  reducers: {
    addToFavorites: (state, action) => {
      const quote = action.payload
      if (!state.favorites.find(fav => fav.id === quote.id)) {
        state.favorites.push(quote)
        localStorage.setItem('favoriteQuotes', JSON.stringify(state.favorites))
      }
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomQuote.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchRandomQuote.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentQuote = action.payload
        state.quotesHistory = [action.payload, ...state.quotesHistory.slice(0, 9)]
      })
      .addCase(fetchRandomQuote.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { addToFavorites, clearError } = quotesSlice.actions
export default quotesSlice.reducer
