// src/features/quotes/QuoteDisplay.jsx
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRandomQuote, addToFavorites } from './quotesSlice'

const QuoteDisplay = () => {
  const dispatch = useDispatch()
  const { currentQuote, isLoading, error } = useSelector((state) => state.quotes)

  useEffect(() => {
    dispatch(fetchRandomQuote())
  }, [dispatch])

  const handleFetchNew = () => {
    dispatch(fetchRandomQuote())
  }

  const handleAddFavorite = () => {
    if (currentQuote) {
      dispatch(addToFavorites(currentQuote))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl max-w-2xl w-full p-8 text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">✨ Random Quote Generator</h1>

        {isLoading && (
          <p className="text-lg text-gray-500 animate-pulse">Fetching quote...</p>
        )}

        {error && (
          <p className="text-red-500 font-medium">{error}</p>
        )}

        {currentQuote && (
          <div className="mb-6">
            <blockquote className="text-xl italic text-gray-700 mb-4 border-l-4 border-blue-400 pl-4">
              “{currentQuote.text}”
            </blockquote>
            <p className="text-gray-600 font-semibold">— {currentQuote.author}</p>
          </div>
        )}

        <div className="flex justify-center gap-4">
          <button
            onClick={handleAddFavorite}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded transition"
          >
            💖 Add to Favorites
          </button>

          <button
            onClick={handleFetchNew}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded transition"
          >
            🔄 New Quote
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuoteDisplay
