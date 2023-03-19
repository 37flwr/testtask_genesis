import React from "react";
import classnames from "classnames";
import Locked from "../../assets/locked.png";
import "./styles.scss";
import { fancyTimeFormat } from "../../utils/formatters";

const Lesson = ({ data, activeLesson, handleClick }) => {
  const { id, duration, previewImageLink, status, order, title } = data;
  return (
    <div
      className={classnames(
        "lesson",
        activeLesson === id && "lesson--active",
        status !== "unlocked" && "lesson--locked"
      )}
    >
      {status !== "unlocked" && (
        <img className="lesson--locked__img" src={Locked} alt="lesson locked" />
      )}
      <div
        onClick={() => status === "unlocked" && handleClick(id)}
        className="lesson__details"
      >
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <img
            className="lesson__details__img"
            src={`${previewImageLink}/lesson-${order}.webp`}
            alt=""
          />
          <h3 className="lesson__details__title">{title}</h3>
        </div>
        <p className="lesson__details__duration">{fancyTimeFormat(duration)}</p>
      </div>
      <div
        className="lesson__underline"
        style={{ borderBottom: "1px solid black" }}
      />
    </div>
  );
};

export default Lesson;
