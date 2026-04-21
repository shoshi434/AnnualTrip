import { useNavigate } from "react-router-dom";
import "./homePage.css";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { useState } from "react";
import RegisterForTrip from "../features/student/RegisterForTrip";

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  return (
    <>
      <h1>ברוכים הבאים לאתר ניהול הטיול השנתי</h1>
      <p>אנא בחרו את סוג המשתמש שלכם כדי להמשיך</p>
      <div className="button-container">
      <Button variant="contained" sx={{height: "50px",width: "200px", fontWeight: 700, fontSize: "22px", backgroundColor: 'orange','&:hover': {backgroundColor: 'darkorange', color: 'white'}, }} onClick={handleOpen}>תלמידה</Button>
      <Button variant="contained" sx={{height: "50px", width: "200px", fontWeight: 700, fontSize: "22px", backgroundColor: 'orange','&:hover': {backgroundColor: 'darkorange', color: 'white'}, }} onClick={() => navigate("/teacherLogin")}>מורה</Button>
      <Button variant="contained" sx={{height: "50px", width: "200px", fontWeight: 700, fontSize: "22px", backgroundColor: 'orange','&:hover': {backgroundColor: 'darkorange', color: 'white'}, }} onClick={() => navigate("/parentLogin")}>הורה</Button>
      </div>

     <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>רישום לטיול כיתות ו </DialogTitle>
        <DialogContent>
          <RegisterForTrip/>
        </DialogContent>
      </Dialog>
    </>
  );
};


export default HomePage;