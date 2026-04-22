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
    <div className="home-container">
      <h1 className="title">:)ככה עושים היום טיול</h1>
      <p className="subtitle">?מי את/ה</p>
      <div className="button-container">
      <Button variant="contained" sx={{height: "50px",width: "200px", fontWeight: 700, fontSize: "22px", backgroundColor: 'orange','&:hover': {backgroundColor: 'darkorange', color: 'white'}, }} onClick={handleOpen}>תלמידה</Button>
      <Button variant="contained" sx={{height: "50px", width: "200px", fontWeight: 700, fontSize: "22px", backgroundColor: 'orange','&:hover': {backgroundColor: 'darkorange', color: 'white'}, }} onClick={() => navigate("/teacherLogin")}>מורה</Button>
      <Button variant="contained" sx={{height: "50px", width: "200px", fontWeight: 700, fontSize: "22px", backgroundColor: 'orange','&:hover': {backgroundColor: 'darkorange', color: 'white'}, }} onClick={() => navigate("/parentLogin")}>הורה</Button>
      </div>

     <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{fontWeight: 700 , textAlign: 'center' }}>רישום לטיול כיתות ו </DialogTitle>
        <DialogContent>
          <RegisterForTrip handleClose={handleClose}/>
        </DialogContent>
      </Dialog>
    </div>
  );
};


export default HomePage;