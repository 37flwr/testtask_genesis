import { createContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Hls from "hls.js";
import { coursesActions } from "../store/ducks/courses";

export const PipContext = createContext();

const PipProvider = ({ children }) => {
  const [video, setVideo] = useState(null);
  const videoRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Hls.isSupported() && video) {
      var hls = new Hls();
      hls.loadSource(video.link);
      hls.attachMedia(videoRef.current);
      if (video.autoplay) {
        videoRef.current.play();
      }
      if (video.timing) {
        videoRef.current.currentTime = video.timing;
      }
    }
  }, [video]);

  const updatePip = (newLink) => {
    if (video) {
      dispatch(
        coursesActions.changeProgress({
          courseId: video.courseId,
          lessonId: video.lessonId,
          timing: videoRef.current.currentTime,
        })
      );
    }
    if (newLink?.link) {
      setVideo(newLink);
    } else {
      setVideo(null);
    }
  };

  return (
    <PipContext.Provider value={{ updatePip }}>
      {children}
      {video && (
        <div className="pip">
          <video style={{ width: "200px" }} controls ref={videoRef}></video>
        </div>
      )}
    </PipContext.Provider>
  );
};

export default PipProvider;
