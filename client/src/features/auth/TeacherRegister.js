import { useNavigate } from "react-router-dom";
import {createTeacher} from "../../api/teacherApi";
import { useState } from "react";
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { orangeFieldWhite } from "../muiStyles";
const TeacherRegister = () => {
    const navigate = useNavigate();
    const [teacherData, setTeacherData] = useState({fullName: '',id: '',className: '' });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async () => {
        try {
            if (!teacherData.fullName || !teacherData.id || !teacherData.className) {
                setError("נא למלא את כל השדות");
                return;
            }
            await createTeacher(teacherData);
            setError("");
            setSuccess("נרשמת בהצלחה!");
                setTimeout(() => {
                    navigate('/teacherLogin');
                }, 2000);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    setError("מורה עם תעודת זהות זו כבר רשומה");
                } else {
                    setError("שגיאה בהרשמת המורה בדקי את הפרטים ונסי שוב");
                }
            } else {
                setError("שגיאה בהתחברות לשרת");
            }
        }
    };

    
    return (
       <Box dir="rtl" sx={{ pt: 1 }}>
         <h1 style={{color: "orange", fontFamily: "Arial", marginBottom: "32px"}}>רישום מורה</h1>
            <TextField
                label="שם מלא 3-50 תווים"
                value={teacherData.fullName}
                onChange={(e) => setTeacherData({...teacherData, fullName: e.target.value})}
                fullWidth
                sx={{ ...orangeFieldWhite, mb: 3 }}
            />
            <TextField
                label="תעודת זהות"
                value={teacherData.id}
                onChange={(e) => setTeacherData({...teacherData, id: e.target.value})}
                fullWidth
                sx={{ ...orangeFieldWhite, mb: 3 }}
            />
            <FormControl fullWidth sx={{ ...orangeFieldWhite, mb: 3 }}>
                <InputLabel sx={{ '&.Mui-focused': { color: 'darkorange' } }}>כיתה</InputLabel>
                <Select
                    value={teacherData.className}
                    label="כיתה"
                    onChange={(e) => setTeacherData({...teacherData, className: e.target.value})}
                >
                    <MenuItem value=''>בחר כיתה</MenuItem>
                    <MenuItem value='ו-1'>ו-1</MenuItem>
                    <MenuItem value='ו-2'>ו-2</MenuItem>
                    <MenuItem value='ו-3'>ו-3</MenuItem>
                    <MenuItem value='ו-4'>ו-4</MenuItem>
                    <MenuItem value='ו-5'>ו-5</MenuItem>
                    <MenuItem value='ו-6'>ו-6</MenuItem>
                </Select>
            </FormControl>
            <Button
                variant="contained"
                onClick={handleRegister}
                fullWidth
                sx={{ backgroundColor: 'orange', '&:hover': { backgroundColor: 'darkorange' }, fontWeight: 700, fontSize: '16px' }}
            >הירשם</Button>
            {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
            {success && <Typography color="primary" sx={{ mt: 1 }}>{success}</Typography>}
        </Box>
    );
}

export default TeacherRegister;