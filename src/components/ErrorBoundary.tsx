import { Component, type ErrorInfo, type ReactNode } from 'react';
import { playPressKey, playTick } from '../utils/sound';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Top-level error boundary. Prevents any uncaught render error in the
 * tree (e.g. a localStorage throw in ThemeContext, a data-shape mismatch
 * in a portfolio case study) from blanking the entire page. The user
 * sees a small recovery message instead of a white screen.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // Initialize in the constructor so we don't shadow the inherited
  // `state` and `props` properties from React.Component.
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // Log to the console so devs can investigate. In a production build
    // you would also forward to your error reporting service here.
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught an error:', error, info.componentStack);
  }

  private handleReset = () => {
    playTick();
    this.setState({ hasError: false, error: null });
  };

  private handleReload = () => {
    playPressKey();
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    if (this.props.fallback) return this.props.fallback;

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4EFE6] dark:bg-[#090807] text-[#111111] dark:text-[#F4EFE6] p-6 font-sans">
        <div className="max-w-md text-center space-y-4">
          <div className="font-mono text-xs uppercase tracking-[0.24em] text-[#E04F2B]">
            SYS.HALT // RUNTIME FAULT
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl">Something interrupted the experience.</h1>
          <p className="text-sm text-[#555555] dark:text-[#A0988C] leading-relaxed">
            An unexpected error stopped this page from rendering. The rest of the
            site is unaffected — reload to try again, or head back to the home page.
          </p>
          {this.state.error && (
            <pre className="text-left text-[10px] font-mono text-[#777] dark:text-[#777] bg-black/5 dark:bg-white/5 p-3 overflow-x-auto whitespace-pre-wrap break-words">
              {this.state.error.message}
            </pre>
          )}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={this.handleReload}
              className="font-mono text-xs uppercase tracking-widest px-4 py-2 bg-[#E04F2B] text-white hover:bg-[#F06138] transition-colors cursor-pointer"
            >
              Reload
            </button>
            <button
              onClick={this.handleReset}
              className="font-mono text-xs uppercase tracking-widest px-4 py-2 border border-[#E04F2B] text-[#E04F2B] hover:bg-[#E04F2B] hover:text-white transition-colors cursor-pointer"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
