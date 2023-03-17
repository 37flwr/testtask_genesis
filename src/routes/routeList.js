import { useRoutes } from "react-router";
import { Navigate } from "react-router-dom";
import CourseList from "../pages/CourseList";
import Course from "../pages/Course";

const routeList = [
  {
    path: "courses",
    element: <CourseList />,
  },
  {
    path: "courses/:id",
    element: <Course />,
  },
  { path: "*", element: <Navigate to="/courses" /> },
];

const AppRoutes = () => {
  return useRoutes(routeList);
};

export default AppRoutes;
