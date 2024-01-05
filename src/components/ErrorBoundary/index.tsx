import React, { ErrorInfo, ReactNode } from "react";

import { datadogRum } from "@datadog/browser-rum";

// import { InternalServerErrorTemplate } from "components/templates/errors/InternalServerError";

type Props = {
  children?: ReactNode;
};

type State = {
  hasError: boolean;
};

/**
 * Component that catches errors in the child component tree and displays a fallback UI instead of the crashed component tree.
 *
 * Catch errors that occur during rendering of the entire subordinate tree, in lifecycle methods and in constructors.
 *
 * {@link https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary}
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Used to render fallback UI after an error is thrown.
   *
   * @returns `{ hasError: boolean }`
   */
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  /**
   * Function called when an Unhandled Rejection occurs.
   * @param event `PromiseRejectionEvent`
   *
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event}
   */
  private onUnhandledRejection = (event: PromiseRejectionEvent) => {
    event.promise.catch(() => {
      this.setState(ErrorBoundary.getDerivedStateFromError());
    });
  };

  componentDidMount() {
    window.addEventListener("unhandledrejection", this.onUnhandledRejection);
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.onUnhandledRejection);
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Called after render
    datadogRum.addError(error, {
      description: "ErrorBoundary",
      errorInfo: errorInfo,
    });
  }

  render() {
    const { children } = this.props;

    //  Comment out the ability to fall back to the 500 error screen until errors that should not be caught in the error boundary have been corrected.
    // if (this.state.hasError && !location.pathname.includes("500")) {
    //   return <InternalServerErrorTemplate />;
    // }

    return children;
  }
}
