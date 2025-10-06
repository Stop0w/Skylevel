import React, { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    console.error('ErrorBoundary caught an error:', error)
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary component stack:', errorInfo.componentStack)
    console.error('ErrorBoundary error stack:', error.stack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 border-4 border-red-500 p-8">
          <h1 className="text-2xl font-bold text-red-800 mb-4">Something went wrong!</h1>
          <details className="bg-red-100 p-4 rounded">
            <summary className="cursor-pointer font-semibold text-red-700">Error Details</summary>
            <pre className="mt-4 text-sm text-red-600 whitespace-pre-wrap">
              {this.state.error?.stack}
            </pre>
          </details>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary