import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div className="full-page content-center">
      {[...Array(3)].map((_, i) => (
        <Spinner animation="grow" size="sm" key={i} />
      ))}
    </div>
  );
};

export default Loading;
