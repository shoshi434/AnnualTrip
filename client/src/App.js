import './App.css';
import {BrowserRouter as Router, Routes,Route}from "react-router-dom"
import TeacherLayout from './routs/teacherLayout';
import HomePage from "./pages/HomePage";
import TeacherLogin from './features/auth/TeacherLogin';
import ParentLogin from './features/auth/ParentLogin';

function App() {
  return (
    <div className="App">
    <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tracking" element={<h1>Tracking Page</h1>} />
      <Route path="/parentLogin" element={<ParentLogin />} />
      <Route path="/teacherLogin" element={<TeacherLogin />} />
      
      <Route path="/teacher" element={<TeacherLayout />} >
        <Route path="teachers" element={<h1>Teachers Page</h1>} />
        <Route path="students" element={<h1>Students Page</h1>} />
      </Route>

    </Routes>
    </Router>
    <footer style={{color: "orange", backgroundColor: "#1a1a1a", position: "fixed", bottom: 0, left: 0, right: 0, width: "100%", textAlign: "center", padding: "12px", fontSize: "14px", fontFamily: "Arial, sans-serif"}} >
      © SHOSHI 2026
    </footer>
    </div>
  );
}

export default App;
