import { Spinner } from "react-bootstrap";
import "./styles.scss";

const Loading = () => {
  return (
    <div className="loading">
      {[...Array(3)].map((_, i) => (
        <Spinner animation="grow" size="sm" key={i} />
      ))}
    </div>
  );
};

export default Loading;
