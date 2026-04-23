import {useState} from 'react';
import {createStudent} from '../../api/studentApi';
import { orangeField } from '../muiStyles';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

const RegisterForTrip = ({ handleClose }) => {
    const [studentData, setStudentData] = useState({ fullName: '', id: '', className: '' });
    const [error, setError] = useState("");
    const [successData, setSuccessData] = useState(null);

    const handleRegister = async () => {
        try {
            if (!studentData.fullName || !studentData.id || !studentData.className) {
                setError("נא למלא את כל השדות");
                return;
            }
            await createStudent(studentData);
            setError("");
            setSuccessData({ ...studentData });
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    setError("תלמידה עם תעודת זהות זו כבר רשומה");
                } else {
                    setError("שגיאה בהרשמת התלמידה בדקי את הפרטים ונסי שוב");
                }
            } else {
                setError("שגיאה בהתחברות לשרת");
            }
        }
    };

    const handleSuccessConfirm = () => {
        setSuccessData(null);
        setStudentData({ fullName: '', id: '', className: '' });
        handleClose();
    };

    if (successData) {
        return (
            <Dialog open={true} onClose={handleSuccessConfirm} dir="rtl">
                <DialogTitle sx={{ color: 'darkorange', fontWeight: 700 }}>נרשמת בהצלחה!</DialogTitle>
                <DialogContent>
                    <Typography sx={{ mb: 1, fontWeight: 600 }}>פרטי הרישום:</Typography>
                    <Typography>שם: {successData.fullName}</Typography>
                    <Typography>ת"ז: {successData.id}</Typography>
                    <Typography>כיתה: {successData.className}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSuccessConfirm} variant="contained" sx={{ backgroundColor: 'orange', '&:hover': { backgroundColor: 'darkorange' } }}>אישור</Button>
                </DialogActions>
            </Dialog>
        );
    }

    return (
        <Box dir="rtl" sx={{ pt: 1 }}>
            <TextField
                label="שם מלא 3-50 תווים"
                value={studentData.fullName}
                onChange={(e) => setStudentData({...studentData, fullName: e.target.value})}
                fullWidth
                sx={{ ...orangeField, mb: 3 }}
            />
            <TextField
                label="תעודת זהות"
                value={studentData.id}
                onChange={(e) => setStudentData({...studentData, id: e.target.value})}
                fullWidth
                sx={{ ...orangeField, mb: 3 }}
            />
            <FormControl fullWidth sx={{ ...orangeField, mb: 3 }}>
                <InputLabel sx={{ '&.Mui-focused': { color: 'darkorange' } }}>כיתה</InputLabel>
                <Select
                    value={studentData.className}
                    label="כיתה"
                    onChange={(e) => setStudentData({...studentData, className: e.target.value})}
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
        </Box>
    );
}

export default RegisterForTrip;