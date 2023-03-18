import { createContext, useEffect, useRef, useState } from "react";
import Hls from "hls.js";

export const PipContext = createContext();

const PipProvider = ({ children }) => {
  const [videoParams, setVideoParams] = useState(null);
  //   const videoRef = useRef();

  //   if (Hls.isSupported() && videoParams) {
  //     var hls = new Hls();
  //     hls.loadSource(videoParams.link);
  //     hls.attachMedia(videoRef.current);
  //   }

  //   useEffect(() => {
  //     if (videoRef.current && videoParams?.timing) {
  //       videoRef.current.currentTime = videoParams.timing;
  //       if (videoParams.autoplay) {
  //         console.log(videoParams.autoplay);
  //         videoRef.current.play();
  //       }
  //     }
  //   }, [videoParams]);

  return (
    <PipContext.Provider value={{ setVideoParams }}>
      {children}
      {/* {videoParams && (
        <div className="pip">
          <video
            autoplay
            style={{ width: "200px" }}
            controls
            ref={videoRef}
          ></video>
        </div>
      )} */}
    </PipContext.Provider>
  );
};

export default PipProvider;
