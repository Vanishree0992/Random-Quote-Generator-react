import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RefreshCw, BookOpen, Heart } from 'lucide-react'

// Components
import QuoteCard from './components/QuoteCard'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'

// Redux
import { 
  fetchRandomQuote, 
  addToFavorites, 
  removeFromFavorites, 
  clearError 
} from './store/quotesSlice'

const App = () => {
  const dispatch = useDispatch()
  const { currentQuote, isLoading, error, favorites } = useSelector(state => state.quotes)

  useEffect(() => {
    // Fetch initial quote on component mount
    dispatch(fetchRandomQuote())
  }, [dispatch])

  const handleNewQuote = () => {
    dispatch(fetchRandomQuote())
  }

  const handleFavorite = (quote) => {
    const isFavorite = favorites.find(fav => fav.id === quote.id)
    
    if (isFavorite) {
      dispatch(removeFromFavorites(quote))
    } else {
      dispatch(addToFavorites(quote))
    }
  }

  const handleClearError = () => {
    dispatch(clearError())
  }

  const isFavorite = currentQuote && favorites.find(fav => fav.id === currentQuote.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-12 h-12 text-white mr-3" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              QuoteVerse
            </h1>
          </div>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            Discover wisdom, inspiration, and motivation with every click
          </p>
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          {/* Quote Display */}
          <div className="min-h-[300px] flex items-center">
            {isLoading && <LoadingSpinner />}
            
            {error && !isLoading && (
              <ErrorMessage
                error={error}
                onRetry={handleNewQuote}
                onClearError={handleClearError}
              />
            )}
            
            {currentQuote && !isLoading && !error && (
              <QuoteCard
                quote={currentQuote}
                onFavorite={handleFavorite}
                isFavorite={!!isFavorite}
              />
            )}
          </div>

          {/* Action Button */}
          {!error && (
            <div className="text-center">
              <button
                onClick={handleNewQuote}
                disabled={isLoading}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <span className="flex items-center space-x-3">
                  <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-300`} />
                  <span>{isLoading ? 'Getting Quote...' : 'New Quote'}</span>
                </span>
                
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </button>
            </div>
          )}

          {/* Favorites Counter */}
          {favorites.length > 0 && (
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Heart className="w-4 h-4 text-red-400 fill-current" />
                <span className="text-white/80 text-sm">
                  {favorites.length} favorite{favorites.length !== 1 ? 's' : ''} saved
                </span>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center mt-16 pb-8">
          <p className="text-white/60 text-sm">
            Powered by Quotable API • Built with React & Redux Toolkit
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App