import { createContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";
import Hls from "hls.js";

import { coursesActions } from "../store/ducks/courses";
import { hotkeysParams } from "../schemes/hotkeysParams";

import "./styles.scss";

export const PipContext = createContext();

const PipProvider = ({ children }) => {
  const [video, setVideo] = useState(null);
  const videoRef = useRef();
  const dispatch = useDispatch();

  // Set new video once pip is called
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

  // Handle hotkeys for playback speed
  useEffect(() => {
    const handlePlaybackChange = (event) => {
      const newPlaybackSpeed = hotkeysParams.find(
        (h) => h.key === event.key
      ).action;
      videoRef.current.playbackRate = newPlaybackSpeed;
      toast.success(`Playback speed changed to ${newPlaybackSpeed}x`, {
        duration: 2000,
      });
    };
    window.addEventListener("keydown", handlePlaybackChange);

    return () => {
      window.removeEventListener("keydown", handlePlaybackChange);
    };
  }, []);

  // Handle change of pip current video
  const updatePip = (newVideo) => {
    if (video && videoRef.current) {
      dispatch(
        coursesActions.changeProgress({
          courseId: video.courseId,
          lessonId: video.lessonId,
          timing: videoRef.current.currentTime,
        })
      );
      console.log(video.handleOnClose);
      video.handleOnClose && video.handleOnClose(videoRef.current);
    }

    newVideo?.link ? setVideo(newVideo) : setVideo(null);
  };

  return (
    <PipContext.Provider value={{ updatePip }}>
      {children}
      {video && (
        <div className="pip">
          <div className="pip--container">
            <Button className="pip__btn" onClick={() => updatePip(null)}>
              x
            </Button>
            <video className="pip__video" controls ref={videoRef}></video>
          </div>
        </div>
      )}
    </PipContext.Provider>
  );
};

export default PipProvider;
