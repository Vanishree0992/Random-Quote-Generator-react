import React from 'react'
import { Quote, AlertTriangle } from 'lucide-react'

const ErrorMessage = ({ error, onRetry, onClearError }) => {
  return (
    <div className="bg-red-500/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-red-400/30 w-full">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="text-red-200 text-xl font-semibold mb-2">Oops! Something went wrong</h3>
        <p className="text-red-300/80 mb-6 max-w-md mx-auto">{error}</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition-colors duration-200 hover:shadow-lg transform hover:scale-105"
          >
            Try Again
          </button>
          <button
            onClick={onClearError}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-full font-medium transition-colors duration-200"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorMessage