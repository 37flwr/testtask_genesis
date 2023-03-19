import { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { coursesActions } from "../../store/ducks/courses";
import useSwr from "swr";
import Hls from "hls.js";
import toast from "react-hot-toast";

import Lesson from "./Lesson";
import PlaybackSpeed from "./PlaybackSpeed";
// import { PipContext } from "../../context/PipProvider";

const Course = () => {
  const videoRef = useRef();
  let lessonIdRef = useRef();
  const [activeLessonId, setActiveLessonId] = useState("");
  const [videoLinkPresent, setVideoLinkPresent] = useState(true);
  const location = useLocation();

  const hotkeysParams = [
    { key: "1", action: "0.5" },
    { key: "2", action: "0.75" },
    { key: "3", action: "1" },
    { key: "4", action: "1.5" },
    { key: "5", action: "2" },
  ];

  const { id } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.Courses);

  const { data: token } = useSwr({
    url: "https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions",
  });
  const { data: courseDetails } = useSwr(() => ({
    url: `https://api.wisey.app/api/v1/core/preview-courses/${id}`,
    params: [["token", token.token]],
  }));

  // Init new course in redux state if there is no such in there
  useEffect(() => {
    if (courseDetails && courses && !courses.find((c) => c.courseId === id)) {
      dispatch(
        coursesActions.initCourse({
          courseId: id,
          activeLessonId: courseDetails.lessons[0].id,
        })
      );
    }
  }, [courseDetails]);

  // Set video timing to be equal to stored value
  useEffect(() => {
    const timing = courses
      .find((c) => c.courseId === id)
      ?.progress?.find((p) => p.lessonId === activeLessonId)?.timing;
    if (timing) {
      videoRef.current.currentTime = timing;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLessonId]);

  // Add lesson id to search params if there is no stored one and store new one in redux store
  useEffect(() => {
    let currentCourse = courses?.find((c) => c.courseId === id);
    if (!searchParams.get("lesson_id")) {
      if (currentCourse) {
        setSearchParams(`lesson_id=${currentCourse.activeLessonId}`);
        setActiveLessonId(currentCourse.activeLessonId);
      } else {
        dispatch(
          coursesActions.changeActiveLesson({
            courseId: id,
            activeLessonId: courseDetails.lessons[0].id,
          })
        );
        setSearchParams(`lesson_id=${courseDetails.lessons[0].id}`);
        setActiveLessonId(courseDetails.lessons[0].id);
      }
    } else {
      setActiveLessonId(searchParams.get("lesson_id"));
      lessonIdRef.current = searchParams.get("lesson_id");
      if (currentCourse.activeLessonId !== searchParams.get("lesson_id")) {
        dispatch(
          coursesActions.changeActiveLesson({
            courseId: id,
            activeLessonId: searchParams.get("lesson_id"),
          })
        );
      }
    }
  }, [location]);

  // Init hls ref and attach it to video
  if (Hls.isSupported() && courseDetails.lessons && activeLessonId) {
    var hls = new Hls();
    const link = courseDetails.lessons?.find(
      (o) => o.id === activeLessonId
    )?.link;
    if (link) {
      hls.loadSource(link);
      hls.attachMedia(videoRef.current);
    } else {
      if (videoLinkPresent) {
        setVideoLinkPresent(false);
      }
    }
  }

  // Handle change lesson
  const handleChangeLesson = (newLessonId) => {
    if (videoRef.current) {
      dispatch(
        coursesActions.changeProgress({
          courseId: id,
          lessonId: searchParams.get("lesson_id"),
          timing: videoRef.current.currentTime,
        })
      );
    }
    setSearchParams(`lesson_id=${newLessonId}`);
    setActiveLessonId(newLessonId);
  };

  // Handle hotkeys for playback speed
  useEffect(() => {
    const handlePlaybackChange = (event) => {
      const newPlaybackSpeed = hotkeysParams.find(
        (h) => h.key === event.key
      ).action;
      videoRef.current.playbackRate = newPlaybackSpeed;
      toast(`playback speed changed to ${newPlaybackSpeed}`, {
        icon: "👏",
        duration: 2000,
      });
    };
    window.addEventListener("keydown", handlePlaybackChange);

    return () => {
      window.removeEventListener("keydown", handlePlaybackChange);
    };
  }, []);

  // Store current video timing on component unmount
  useEffect(() => {
    let localVideoRef = null;
    if (videoRef.current) localVideoRef = videoRef.current;

    return () => {
      dispatch(
        coursesActions.changeProgress({
          courseId: id,
          lessonId: lessonIdRef.current,
          timing: localVideoRef.currentTime,
        })
      );
    };
  }, []);

  return (
    <div className="course page-layout">
      <div className="course-lessons">
        {videoLinkPresent ? (
          <video
            controls
            ref={videoRef}
            className="course-lessons-video"
          ></video>
        ) : (
          <div className="not-found-video">Sorry... There is no such video</div>
        )}
        <div className="course-lessons-list">
          {courseDetails.lessons
            ?.sort((a, b) => a.order - b.order)
            .map((lesson, idx) => (
              <Lesson
                data={lesson}
                key={idx}
                activeLesson={activeLessonId}
                handleClick={handleChangeLesson}
              />
            ))}
        </div>
      </div>
      <div className="course-details">{courseDetails.title}</div>
      <PlaybackSpeed params={hotkeysParams} />
    </div>
  );
};

export default Course;
