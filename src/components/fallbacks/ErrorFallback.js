import React from "react";
import { Button } from "react-bootstrap";

const ErrorFallback = () => {
  return (
    <div className="full-page content-center flex-column">
      <p className="">Oops... Something went wrong! Try again later</p>
      <Button variant="outline-info" onClick={() => window.location.reload()}>
        Reload Page
      </Button>
    </div>
  );
};

export default ErrorFallback;
