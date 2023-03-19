import React from "react";
import classnames from "classnames";
import Locked from "../../assets/locked.png";
import "./styles.scss";
import { fancyTimeFormat } from "../../utils/formatters";

const Lesson = ({ data, activeLesson, handleClick }) => {
  const { id, duration, previewImageLink, status, order, title } = data;
  return (
    <div className="lesson">
      {status !== "unlocked" && (
        <img className="lesson-locked-img" src={Locked} alt="lesson locked" />
      )}
      <div
        onClick={() => status === "unlocked" && handleClick(id)}
        className={classnames(
          "lesson-details",
          activeLesson === id && "lesson-active",
          status !== "unlocked" && "lesson-locked"
        )}
      >
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <img
            className="lesson-details-img"
            src={`${previewImageLink}/lesson-${order}.webp`}
            alt=""
          />
          <h3 className="lesson-details-title">{title}</h3>
        </div>
        <p className="lesson-details-duration">{fancyTimeFormat(duration)}</p>
      </div>
      <div style={{ borderBottom: "1px solid black" }} />
    </div>
  );
};

export default Lesson;
