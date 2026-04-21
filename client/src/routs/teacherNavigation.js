import { NavLink , useNavigate } from "react-router-dom";
import "./navigation.css";

const TeacherNavigation = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="teacher-nav">
      <NavLink to="/teacher/teachers" className="nav-link">מורות</NavLink>
      <NavLink to="/teacher/students" className="nav-link">תלמידות</NavLink>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </nav>
  );
};

export default TeacherNavigation;