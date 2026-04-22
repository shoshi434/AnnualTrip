import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box , TextField , Typography , Button } from "@mui/material";
import { orangeFieldWhite } from "../muiStyles";
import { teacherLogin } from "../../api/teacherApi";

const TeacherLogin = () => {
    const [teacherId, setTeacherId] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        const details = { id : teacherId };
        try {
            if (!teacherId) {
                setError('אנא הזן את מספר תעודת הזהות שלך');
                return;
            }
            const response = await teacherLogin(details);
            localStorage.setItem('token', response.data.token);
            navigate('/teacher');
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    setError('תעודת הזהות שלך לא קיימת במערכת, ניתן להירשם ולנסות שוב');
                } else {
                    setError('שגיאה בכניסה אנא נסה שוב');
                }
            } else {
                setError('שגיאה ברשת');
            }
        }
    };

    return (
        <Box dir="rtl" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <h1 style={{color: "orange", fontFamily: "Arial", marginBottom: "32px"}}>כניסת מורה</h1>
            <TextField
                label="מספר תעודת זהות"
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
                sx={{ ...orangeFieldWhite, mb: 3, width: '500px' , height: '50px' }}
            />
            <Button
             onClick={handleLogin} 
             variant="contained" 
             sx={{ backgroundColor: 'orange', '&:hover': { backgroundColor: 'darkorange' }, fontWeight: 700, fontSize: '16px', width: '500px', height: '50px' }}
             >התחבר</Button>
            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

            <button onClick={() => navigate('/teacherRegister')} style={{ marginTop: '16px', backgroundColor: 'transparent', border: 'none', color: 'orange', textDecoration: 'underline', cursor: 'pointer' }}>מורה חדשה? נרשמים ממש כאן</button>
        </Box>
    );
}   

export default TeacherLogin;