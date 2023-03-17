import useSwr from "swr";

import CourseCard from "./CourseCard";

const CourseList = () => {
  const { data: token } = useSwr({
    url: "https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions",
  });
  const { data: courses } = useSwr(() => ({
    url: "https://api.wisey.app/api/v1/core/preview-courses",
    params: [["token", token.token]],
  }));

  return (
    <section className="three-col-grid">
      {courses?.courses.map((course) => (
        <CourseCard key={course.id} data={course} />
      ))}
    </section>
  );
};

export default CourseList;
