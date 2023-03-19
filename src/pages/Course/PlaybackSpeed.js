import React from "react";

const PlaybackSpeed = ({ params }) => {
  const handleClick = (key) => {
    let newEvent = new KeyboardEvent("keydown", { key: key, ctrlKey: true });
    window.dispatchEvent(newEvent);
  };
  return (
    <div className="playback-speed">
      {params.map((hParams) => (
        <div className="playback-speed-elem" key={hParams.key}>
          <button onClick={() => handleClick(hParams.key)}>
            Ctrl + {hParams.key}
          </button>
          <p>To set playback speed to {hParams.action}x</p>
        </div>
      ))}
    </div>
  );
};

export default PlaybackSpeed;
