import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactHlsPlayer from "react-hls-player";
import axios from "axios";
import useSwr from "swr";
import NotFoundImage from "../../assets/not-found-img.png";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import StarRatings from "react-star-ratings";
import "./styles.scss";

const CourseCard = ({ data }) => {
  const { id, description, meta, title, lessonsCount, tags, rating } = data;
  const navigate = useNavigate();

  const [isHovering, setIsHovering] = useState(false);
  const [activeVideoLink, setActiveVideoLink] = useState(false);
  const [activeImgLink, setActiveImgLink] = useState(false);

  const { data: token } = useSwr({
    url: "https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions",
  });

  useEffect(() => {
    axios
      .get(meta?.courseVideoPreview?.link)
      .then(() => setActiveVideoLink(true));
    // if (meta?.courseVideoPreview?.previewImageLink) {
    //   axios
    //     .get(meta?.courseVideoPreview?.previewImageLink + "/cover.webp", {
    //       params: { token },
    //     })
    //     .then((res) => {
    //       console.log(res);
    //       setActiveImgLink(true);
    //     })
    //     .catch((err) => console.log(err));
    // }
  }, [token]);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <Card
      className="fs-grid-elem"
      onMouseOver={() => handleMouseOver((currState) => !currState)}
      onMouseLeave={() => handleMouseOut((currState) => !currState)}
    >
      {isHovering ? (
        <>
          {activeVideoLink ? (
            <ReactHlsPlayer
              src={meta?.courseVideoPreview?.link}
              autoPlay={true}
              controls={false}
              width="100%"
              height="250px"
              muted={true}
            />
          ) : (
            <div className="no-preview">
              <p className="no-preview-content">No preview available</p>
            </div>
          )}
        </>
      ) : (
        <Card.Img
          style={{ height: "250px" }}
          src={meta.courseVideoPreview?.previewImageLink + "/cover.webp"}
        />
        // <>
        //   {activeImgLink ? (

        //   ) : (
        //     <img src={NotFoundImage} style={{ height: "250px" }} alt="" />
        //   )}
        // </>
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
              <Badge bg="light" text="dark">
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
