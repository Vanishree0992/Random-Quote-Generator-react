import React from 'react'
import { RefreshCw } from 'lucide-react'

const LoadingSpinner = () => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 w-full">
      <div className="flex flex-col items-center justify-center space-y-4">
        <RefreshCw className="w-12 h-12 text-white/80 animate-spin" />
        <p className="text-white/80 text-lg">Fetching inspiration...</p>
        <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner