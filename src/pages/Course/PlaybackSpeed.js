import React from "react";
import { Button } from "react-bootstrap";

const PlaybackSpeed = ({ params }) => {
  const handleClick = (key) => {
    let newEvent = new KeyboardEvent("keydown", { key: key, ctrlKey: true });
    window.dispatchEvent(newEvent);
  };
  return (
    <div className="playback-speed">
      {params.map((hParams) => (
        <div className="playback-speed-elem" key={hParams.key}>
          <Button onClick={() => handleClick(hParams.key)}>
            Ctrl + {hParams.key}
          </Button>
          <p>To set playback speed to {hParams.action}x</p>
        </div>
      ))}
    </div>
  );
};

export default PlaybackSpeed;
