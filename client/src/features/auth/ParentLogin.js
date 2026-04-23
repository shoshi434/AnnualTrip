import { parentLogin } from "../../api/parentApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box , TextField , Typography , Button } from "@mui/material";
import { orangeFieldWhite } from "../muiStyles";

const ParentLogin = () => {
    
    const [studentId, setStudentId] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        const details = { id : studentId };
        try {
            if (!studentId) {
                setError("אנא הזן את מספר תעודת הזהות של הילד");
                return;
            }
            const response = await parentLogin(details);
            localStorage.setItem('token', response.data.token);
            navigate('/tracking');
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    setError("תעודת הזהות שלך לא קיימת במערכת");
                } else {
                    setError("שגיאה בכניסה אנא נסה שוב");
                }
            } else {
                setError("שגיאה בהתחברות לשרת");
            }
        }
    };


    return (
        <Box dir="rtl" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <h1 style={{color: "orange", fontFamily: "Arial", marginBottom: "32px"}}>כניסת הורה</h1>
            <TextField
                label="מספר תעודת זהות של הילד"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                sx={{ ...orangeFieldWhite, mb: 3, width: '500px' , height: '50px' }}
            />
            <Button
             onClick={handleLogin} 
             variant="contained" 
             sx={{ backgroundColor: 'orange', '&:hover': { backgroundColor: 'darkorange' }, fontWeight: 700, fontSize: '16px', width: '500px', height: '50px' }}
             >התחבר</Button>
            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        </Box>
    );
}

export default ParentLogin;