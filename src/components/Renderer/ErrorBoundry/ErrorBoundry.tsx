import { Button } from "@/components/ui/button";
import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  fallback: React.ReactNode;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { ...this.state, hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log("Error found: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className=" flex flex-col items-center gap-2">
          <h1 className="text-center mt-2">Oops! Something went wrong.</h1>
          <Button
            variant={"default"}
            onClick={() => {
              window.location.reload();
            }}
          >
            Click to Refresh
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
