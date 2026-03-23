import { Component } from 'react';

/**
 * ErrorBoundary
 * Catches any render-time errors in the weather panel.
 * Shows a recoverable error UI instead of a blank screen.
 *
 * Usage:
 *   <ErrorBoundary>
 *     <WeatherPanel />
 *   </ErrorBoundary>
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message ?? 'Something went wrong.' };
  }

  componentDidCatch(error, info) {
    // In production, send to your error monitoring service here
    console.error('[ErrorBoundary]', error, info);
  }

  reset() {
    this.setState({ hasError: false, message: '' });
    this.props.onReset?.();
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        role="alert"
        className="flex flex-col items-center justify-center py-20 text-center animate-fade-up"
      >
        <span aria-hidden="true" className="text-5xl mb-4">⚠️</span>
        <h2 className="font-display text-2xl font-bold text-white mb-2" style={{ letterSpacing: '-0.03em' }}>
          Something broke
        </h2>
        <p className="text-sm text-neutral-300 mb-6 max-w-xs">
          {this.state.message}
        </p>
        <button
          onClick={() => this.reset()}
          className="px-6 py-2.5 bg-orange-500 text-neutral-900 font-bold text-sm rounded-full transition-opacity hover:opacity-90 focus-ring"
        >
          Try Again
        </button>
      </div>
    );
  }
}
