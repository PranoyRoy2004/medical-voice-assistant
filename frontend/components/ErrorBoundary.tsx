"use client";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#ECE5DD] px-6">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Please refresh the page and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#25D366] text-white px-6 py-3 rounded-full font-semibold"
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}