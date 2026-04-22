import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Tracking = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;
    const studentName = decodedToken ? decodedToken.childName : null;

    const handleLogout = () => {
        navigate("/");
        localStorage.removeItem('token');
    };


    return (
        <>
        <h1 style={{color:"white"}}>שלום להורה של {studentName}</h1>
        <button onClick={handleLogout} className="logout-btn">יציאה</button>
        </>
    );
}   

export default Tracking;