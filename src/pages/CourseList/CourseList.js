import { useSearchParams } from "react-router-dom";
import useSwr from "swr";
import BasicPagination from "../../components/Pagination";

import CourseCard from "./CourseCard";

const CourseList = () => {
  const { data: token } = useSwr({
    url: "https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions",
  });
  const { data: courses } = useSwr(() => ({
    url: "https://api.wisey.app/api/v1/core/preview-courses",
    params: [["token", token.token]],
  }));

  let [searchParams, setSearchParams] = useSearchParams();
  const coursesPerPage = 10;
  let currentPage = searchParams.get("page");
  if (!currentPage) {
    currentPage = 1;
  }

  const idxOfLastCourse = currentPage * coursesPerPage;
  const idxOfFirstCourse = idxOfLastCourse - coursesPerPage;
  const currentCourses = courses?.courses.slice(
    idxOfFirstCourse,
    idxOfLastCourse
  );

  const paginate = (number) => {
    setSearchParams(`page=${number}`);
  };

  return (
    <div className="courses-page">
      <section className="course-list-container">
        {currentCourses?.map((course) => (
          <CourseCard key={course.id} data={course} />
        ))}
      </section>
      <BasicPagination
        elementsPerPage={coursesPerPage}
        totalElements={courses.courses.length}
        paginate={paginate}
        active={currentPage}
      />
    </div>
  );
};

export default CourseList;
