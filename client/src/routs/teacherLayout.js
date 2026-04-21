import { Outlet } from "react-router-dom";
import TeacherNavigation from "./teacherNavigation";

const TeacherLayout = () => {
  return (
    <div>
      <TeacherNavigation />
      <Outlet />
    </div>
  );
};

export default TeacherLayout;