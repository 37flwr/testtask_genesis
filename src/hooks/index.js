import { useContext } from "react";
import { PipContext } from "../context/PipProvider";

export const usePip = () => useContext(PipContext);
