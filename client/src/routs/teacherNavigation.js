import { NavLink , useNavigate } from "react-router-dom";
import "./navigation.css";
import {jwtDecode} from "jwt-decode";

const TeacherNavigation = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const studentName = decodedToken ? decodedToken.fullName : null;

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem('token');
  };

  return (
    <nav className="teacher-nav">
      <h3>שלום, {studentName}</h3>
      <div className="nav-links">
        
        <NavLink to="/teacher/teachers" className="nav-link">כל המורות הרשומות</NavLink>
        <NavLink to="/teacher/students" className="nav-link">כל התלמידות שמצטרפות לטיול</NavLink>
        <NavLink to="/teacher/detection" className="nav-link">איתור תלמידות אבודות</NavLink>
      </div>
      <button onClick={handleLogout} className="logout-btn">יציאה</button>
    </nav>
  );
};

export default TeacherNavigation;