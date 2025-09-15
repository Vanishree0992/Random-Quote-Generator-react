import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunk for fetching quotes
export const fetchRandomQuote = createAsyncThunk(
  'quotes/fetchRandom',
  async (_, { rejectWithValue }) => {
    try {
      // Using quotable API which is reliable and free
      const response = await fetch('https://zenquotes.io/api/random')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      return {
        text: data.content,
        author: data.author,
        tags: data.tags || [],
        id: data._id
      }
    } catch (error) {
      return rejectWithValue(
        error.message || 'Failed to fetch quote. Please check your internet connection.'
      )
    }
  }
)

// Redux slice
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
      const existingQuote = state.favorites.find(fav => fav.id === quote.id)
      
      if (!existingQuote) {
        state.favorites.push(quote)
        // Save to localStorage (Note: In real Claude.ai artifacts, use React state instead)
        localStorage.setItem('favoriteQuotes', JSON.stringify(state.favorites))
      }
    },
    
    removeFromFavorites: (state, action) => {
      const quoteId = action.payload.id
      state.favorites = state.favorites.filter(fav => fav.id !== quoteId)
      // Save to localStorage (Note: In real Claude.ai artifacts, use React state instead)
      localStorage.setItem('favoriteQuotes', JSON.stringify(state.favorites))
    },
    
    clearError: (state) => {
      state.error = null
    },
    
    addToHistory: (state, action) => {
      const quote = action.payload
      // Keep only last 10 quotes in history
      state.quotesHistory = [quote, ...state.quotesHistory.slice(0, 9)]
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
        state.error = null
        // Add to history
        state.quotesHistory = [action.payload, ...state.quotesHistory.slice(0, 9)]
      })
      .addCase(fetchRandomQuote.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { 
  addToFavorites, 
  removeFromFavorites, 
  clearError, 
  addToHistory 
} = quotesSlice.actions

export default quotesSlice.reducer