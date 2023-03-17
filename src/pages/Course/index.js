import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactHlsPlayer from "react-hls-player";
import { progressActions } from "../../store/ducks/progress";
import useSwr from "swr";

import Lesson from "./Lesson";

const Course = () => {
  const { id } = useParams();
  const playerRef = useRef();
  const dispatch = useDispatch();

  const [activeLessonId, setActiveLessonId] = useState("");

  const { progress } = useSelector((state) => state.Progress);

  const { data: token } = useSwr({
    url: "https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions",
  });
  const { data: courseDetails } = useSwr(() => ({
    url: `https://api.wisey.app/api/v1/core/preview-courses/${id}`,
    params: [["token", token.token]],
  }));

  const handleChangeVideo = (id) => {
    if (playerRef.current.currentTime !== 0) {
      dispatch(
        progressActions.changeProgress({
          lesson_id: activeLessonId,
          timing: playerRef.current.currentTime,
        })
      );
    }

    setActiveLessonId(id);
  };

  useEffect(() => {
    const timing = progress.find((a) => a.lesson_id === activeLessonId)?.timing;
    if (timing) {
      playerRef.current.currentTime = timing;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLessonId]);

  useEffect(
    () => setActiveLessonId(courseDetails.lessons[0].id),
    [courseDetails]
  );

  return (
    <div className="course page-layout">
      <div className="course-lessons">
        <ReactHlsPlayer
          src={
            courseDetails?.lessons?.find((o) => o.id === activeLessonId)?.link
          }
          playerRef={playerRef}
          controls={true}
          width="70%"
          height="auto"
        />
        {/* <video
          id="my-video"
          class="video-js"
          controls
          preload="auto"
          width="640"
          height="264"
          data-setup="{}"
        >
          <source
            src={
              courseDetails.lessons?.find((o) => o.id === activeLessonId)?.link
            }
            type="application/x-mpegURL"
          />
        </video> */}
        <div className="course-lessons-list">
          {courseDetails.lessons
            ?.sort((a, b) => a.order - b.order)
            .map((lesson) => (
              <Lesson
                data={lesson}
                activeLesson={activeLessonId}
                handleClick={handleChangeVideo}
              />
            ))}
        </div>
      </div>
      <div className="course-details">{courseDetails.title}</div>
    </div>
  );
};

export default Course;
