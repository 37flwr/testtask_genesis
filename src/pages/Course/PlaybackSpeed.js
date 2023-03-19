import { Button } from "react-bootstrap";

const PlaybackSpeed = ({ params }) => {
  const handleClick = (key) => {
    let newEvent = new KeyboardEvent("keydown", { key: key, ctrlKey: true });
    window.dispatchEvent(newEvent);
  };

  return (
    <div className="playback-speed">
      {params.map((hParams) => (
        <div className="playback-speed__elem" key={hParams.key}>
          <Button
            className="playback-speed__elem__btn"
            onClick={() => handleClick(hParams.key)}
          >
            Ctrl + {hParams.key}
          </Button>
          <p className="playback-speed__elem__text">
            To set playback speed to {hParams.action}x
          </p>
        </div>
      ))}
    </div>
  );
};

export default PlaybackSpeed;
