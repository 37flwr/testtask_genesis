import React from "react";
import PipProvider from "./PipProvider";

const ContextProviders = ({ children }) => {
  return <PipProvider>{children}</PipProvider>;
};

export default ContextProviders;
