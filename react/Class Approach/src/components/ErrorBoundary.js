import { Component } from "react";
class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }
  componentDidCatch(error) {
    this.setState(() => {
      console.log(error);
      return { hasError: true };
    });
  }
  render() {
    if (this.state.hasError) {
      return <p>No can do!</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
