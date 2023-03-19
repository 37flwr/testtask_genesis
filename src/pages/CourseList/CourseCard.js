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
      className="fs-grid-elem courses-list__card"
      onMouseOver={() => handleMouseOver((currState) => !currState)}
      onMouseLeave={() => handleMouseOut((currState) => !currState)}
    >
      {isHovering ? (
        <video
          autoPlay
          controls={false}
          ref={videoRef}
          className="courses-list__card__video"
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
          <img className="courses-list__card__img" src={ImageNotFound} alt="" />
        </picture>
      ) : (
        <img className="courses-list__card__img" src={ImageNotFound} alt="" />
      )}
      <Card.Body className="d-grid gap-2">
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <div className="courses-list__card__details">
          <div className="courses-list__card__details--container">
            <StarRatings
              rating={rating}
              starDimension="20px"
              starSpacing="2px"
              starRatedColor="rgb(230, 67, 47)"
            />
            <Badge className="courses-list__card__details__badge" bg="info">
              {lessonsCount} lessons
            </Badge>
          </div>
          <div className="courses-list__card__details__tags--container">
            {tags.map((tag) => (
              <Badge bg="light" text="dark" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <Button variant="primary" size="lg" onClick={() => navigate(id)}>
          Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
