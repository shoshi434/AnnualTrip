import { jwtDecode } from "jwt-decode";

const Tracking = () => {
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;
    const studentName = decodedToken ? decodedToken.childName : null;

    return (
        <h1 style={{color:"white"}}>שלום להורה של {studentName}</h1>

    );
}   

export default Tracking;