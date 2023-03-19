import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import Hls from "hls.js";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import ImageNotFound from "../../assets/not-found-img.png";
import "./styles.scss";

const CourseCard = ({ data }) => {
  const { id, description, meta, title, lessonsCount, tags, rating } = data;
  const navigate = useNavigate();
  const videoRef = useRef();
  const [isHovering, setIsHovering] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  if (Hls.isSupported() && meta.courseVideoPreview) {
    var hls = new Hls();
    hls.loadSource(meta.courseVideoPreview.link);
    hls.attachMedia(videoRef.current);
  }

  return (
    <Card
      className="fs-grid-elem"
      onMouseOver={() => handleMouseOver((currState) => !currState)}
      onMouseLeave={() => handleMouseOut((currState) => !currState)}
    >
      {isHovering ? (
        <video
          autoPlay
          controls={false}
          ref={videoRef}
          style={{ height: "250px" }}
          muted
        ></video>
      ) : meta.courseVideoPreview?.previewImageLink ? (
        <picture>
          <source
            srcSet={
              meta.courseVideoPreview?.previewImageLink?.replace(
                "preview",
                ""
              ) + "cover.webp"
            }
            type="image/webp"
          />
          <img
            style={{ height: "250px", width: "100%" }}
            src={ImageNotFound}
            alt=""
          />
        </picture>
      ) : (
        <img
          style={{ height: "250px", width: "100%" }}
          src={ImageNotFound}
          alt=""
        />
      )}
      <Card.Body className="d-grid gap-2">
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <div className="course-card-details">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <StarRatings
              rating={rating}
              starDimension="20px"
              starSpacing="2px"
              starRatedColor="rgb(230, 67, 47)"
            />
            <Badge style={{ marginTop: "10px" }} bg="info">
              {lessonsCount} lessons
            </Badge>
          </div>
          <div className="three-col-grid">
            {tags.map((tag) => (
              <Badge bg="light" text="dark" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <Button ovariant="primary" size="lg" onClick={() => navigate(id)}>
          Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
