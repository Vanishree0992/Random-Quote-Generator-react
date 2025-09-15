import React from 'react'
import { Quote, Heart, Share2 } from 'lucide-react'

const QuoteCard = ({ quote, onFavorite, isFavorite }) => {
  const handleShare = async () => {
    const shareText = `"${quote.text}" - ${quote.author}`
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Inspirational Quote',
          text: shareText,
          url: window.location.href
        })
      } else {
        await navigator.clipboard.writeText(shareText)
        // You could add a toast notification here
        alert('Quote copied to clipboard!')
      }
    } catch (error) {
      console.error('Error sharing quote:', error)
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
      <div className="flex items-start justify-between mb-6">
        <Quote className="text-white/60 w-8 h-8 flex-shrink-0" />
        <div className="flex gap-3">
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 group"
            title="Share quote"
            aria-label="Share quote"
          >
            <Share2 className="w-4 h-4 text-white/80 group-hover:scale-110 transition-transform duration-200" />
          </button>
          <button
            onClick={() => onFavorite(quote)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 group"
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              className={`w-4 h-4 group-hover:scale-110 transition-transform duration-200 ${
                isFavorite 
                  ? 'text-red-400 fill-current' 
                  : 'text-white/80'
              }`} 
            />
          </button>
        </div>
      </div>
      
      <blockquote className="text-white text-xl md:text-2xl font-light leading-relaxed mb-6 italic">
        "{quote.text}"
      </blockquote>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <cite className="text-white/80 text-lg font-medium not-italic">
          — {quote.author}
        </cite>
        
        {quote.tags && quote.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {quote.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/20 rounded-full text-white/80 text-sm font-medium capitalize"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default QuoteCard