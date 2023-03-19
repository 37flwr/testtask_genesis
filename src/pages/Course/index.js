import { useEffect, useState, useRef } from "react";
import {
  unstable_HistoryRouter,
  useParams,
  useSearchParams,
  createBrowserHistory,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { coursesActions } from "../../store/ducks/courses";
import useSwr from "swr";
import Hls from "hls.js";

import Lesson from "./Lesson";
// import { PipContext } from "../../context/PipProvider";

const Course = () => {
  const videoRef = useRef();
  let lessonIdRef = useRef();
  const [activeLessonId, setActiveLessonId] = useState("");
  const [videoLinkPresent, setVideoLinkPresent] = useState(true);
  const location = useLocation();

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
      // videoRef.current.ontimeupdate = ({ target }) => {
      //   timeRef.current = target.currentTime;
      // };
    } else {
      if (videoLinkPresent) {
        setVideoLinkPresent(false);
      }
    }
  }

  // Handle change lesson
  const handleChangeLesson = (newLessonId) => {
    dispatch(
      coursesActions.changeProgress({
        courseId: id,
        lessonId: searchParams.get("lesson_id"),
        timing: videoRef.current.currentTime,
      })
    );
    setSearchParams(`lesson_id=${newLessonId}`);
    setActiveLessonId(newLessonId);
  };

  // Handle hotkeys for playback speed
  useEffect(() => {
    const handlePlaybackChange = (event) => {
      if (event.key === "1" && event.ctrlKey) {
        videoRef.current.playbackRate = 1;
      } else if (event.key === "2" && event.ctrlKey) {
        videoRef.current.playbackRate = 1.5;
      } else if (event.key === "3" && event.ctrlKey) {
        videoRef.current.playbackRate = 2;
      } else if (event.key === "4" && event.ctrlKey) {
        videoRef.current.playbackRate = 0.75;
      } else if (event.key === "5" && event.ctrlKey) {
        videoRef.current.playbackRate = 0.5;
      }
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
            style={{ height: "auto", width: "70%" }}
          ></video>
        ) : (
          <div className="not-found-video" style={{ width: "70%" }}>
            Sorry... There is no such video
          </div>
        )}
        <div className="course-lessons-list">
          {courseDetails.lessons
            ?.sort((a, b) => a.order - b.order)
            .map((lesson) => (
              <Lesson
                data={lesson}
                activeLesson={activeLessonId}
                handleClick={handleChangeLesson}
              />
            ))}
        </div>
      </div>
      <div className="course-details">{courseDetails.title}</div>
    </div>
  );
};

export default Course;
