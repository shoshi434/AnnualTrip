import { Outlet } from "react-router-dom";
import TeacherNavigation from "./teacherNavigation";

const TeacherLayout = () => {
  return (
    <div style={{ paddingTop: "60px" }}>
      <TeacherNavigation />
      <Outlet />
    </div>
  );
};

export default TeacherLayout;