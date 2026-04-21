import './App.css';
import {BrowserRouter as Router, Routes,Route}from "react-router-dom"
import TeacherLayout from './routs/teacherLayout';
import HomePage from "./pages/HomePage";
import TeacherLogin from './features/auth/TeacherLogin';
import ParentLogin from './features/auth/ParentLogin';

function App() {
  return (
    <div className="App">
    < Router>
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

    </div>
  );
}

export default App;
