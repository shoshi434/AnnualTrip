import { getAllTeachers , getTeacherById } from "../../api/teacherApi";
import { useEffect, useState } from "react"
import { tableStyles , tableTitle , orangeFieldWhite } from "../muiStyles";
import {Table, TextField, TableBody, TableCell, TableContainer,TableHead, TableRow, Paper, Button} from "@mui/material"

const TeachersList = () => {
    const [teachers, setTeachers] = useState([]);
    const [error, setError] = useState("");
    const [isAllTeachers, setIsAllTeachers] = useState(true);
    const [searchId, setSearchId] = useState("");

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const data = await getAllTeachers();
                const sortedTeachers = data.data.sort((a, b) => a.fullName.localeCompare(b.fullName));
                setTeachers(sortedTeachers);
            } catch (err) {
                setError("שגיאה בטעינת רשימת המורות");
            }
        };

        fetchTeachers();
    }, []);

    const searchTeacher = async () => {
        try {
            const data = await getTeacherById(searchId);
            setTeachers([data.data]);
            setIsAllTeachers(false);
        } catch (err) {
            setTeachers([{ fullName: "לא נמצאה מורה עם תעודת זהות זו", id: "", className: "" }]);
            setIsAllTeachers(false);
        }
    };

    const showAllTeachers = () => {
        setIsAllTeachers(true);
        setError("");
        const fetchTeachers = async () => {
            try {
                const data = await getAllTeachers();
                const sortedTeachers = data.data.sort((a, b) => a.fullName.localeCompare(b.fullName));
                setTeachers(sortedTeachers);
            } catch (err) {
                setError("שגיאה בטעינת רשימת המורות");
            }
        };

        fetchTeachers();
    };

    if (error) {
        return <div style={{color:"white"}}>Error: {error}</div>;
    }

    return (
        <div style={{ padding: "24px", direction: "rtl", width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center" , justifyContent: "center" }}>
                <TextField
                        required
                        label="חפש מורה לפי תעודת זהות"
                        onChange={(e) => {setSearchId(e.target.value)}} 
                        value={searchId}
                        sx={{ ...orangeFieldWhite, mb: 3, width: '300px', height: '50px' }}
                    />
                    <Button onClick={searchTeacher} disabled={!searchId.trim()} variant="contained" sx={{ backgroundColor: 'orange', height: '50px', fontWeight: 700, fontSize: '16px', marginBottom: "16px", marginLeft: "8px", "&.Mui-disabled": { backgroundColor: "grey",color: "black" } }}>חפש</Button>
                    {!isAllTeachers && <Button onClick={showAllTeachers} variant="contained" sx={{ backgroundColor: 'orange', height: '50px', fontWeight: 700, fontSize: '16px', marginBottom: "16px" }}>הצג את כל המורות</Button>} 
            </div>
            <TableContainer component={Paper} sx={{ ...tableStyles }}>
                <Table sx={{ minWidth: 950 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{...tableTitle}}>שם המורה</TableCell>
                            <TableCell align="center" sx={{...tableTitle}}>תעודת זהות</TableCell>
                            <TableCell align="center" sx={{...tableTitle}}>כיתה</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teachers.map((teacher) => (
                            <TableRow sx={{ "&:hover": { backgroundColor: "#2e2e2e" } }}>
                                <TableCell align="center" sx={{ color: "white" }}>{teacher.fullName}</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>{teacher.id}</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>{teacher.className}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TeachersList;