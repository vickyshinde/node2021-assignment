import React from 'react';
import Banner from './shared/Banner';

class HomeErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="alert alert-danger" role="alert">
          Something went wrong in Home.
        </div>
      );
    }
    return this.props.children;
  }
}

const HomeWrapped = (props) => {
  return (
    <HomeErrorBoundary>
      <Home {...props} />
    </HomeErrorBoundary>
  );
};

const Home = () => {
  return (
    <>
      <Banner title="Home" />
      <div className="container">
        <h1>Welcome to collage portal</h1>
      </div>
    </>
  );
};

export default HomeWrapped;
