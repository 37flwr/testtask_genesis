import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  console.log(error.response);
  return (
    <div className="full-page content-center flex-column">
      <p className="">An error occured: {error.response}</p>
      <div className="flex-row std-gap">
        <Button variant="outline-info" onClick={() => resetErrorBoundary()}>
          <Link to="/">Home page</Link>
        </Button>
        <Button variant="outline-info" onClick={() => window.location.reload()}>
          Try again
        </Button>
      </div>
    </div>
  );
};

export default ErrorFallback;
