import { getAllStudents ,getStudentsByClassName } from "../../api/studentApi"
import { useEffect, useState } from "react"
import {jwtDecode} from "jwt-decode"
import { tableStyles , tableTitle} from "../muiStyles"  
import {Table, TableBody, TableCell, TableContainer,TableHead, TableRow, Paper, Button} from "@mui/material"

const StudentsList = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState("");
    const [isAllStudents, setIsAllStudents] = useState(true);
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;
    const className = decodedToken ? decodedToken.className : null;
    
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await getAllStudents()
                const sortedStudents = data.data.sort((a, b) => a.fullName.localeCompare(b.fullName));
                setStudents(sortedStudents)
            } catch (err) {
                setError("שגיאה בטעינת רשימת התלמידות");
            }
        };

        fetchStudents();
    }, [])

    const hendleGetStudentByClassName = async (className) => {
        try {
            if (!isAllStudents) {
                const data = await getAllStudents();
                const sortedStudents = data.data.sort((a, b) => a.fullName.localeCompare(b.fullName));
                setStudents(sortedStudents);
                setIsAllStudents(true);
            } else {
            const data = await getStudentsByClassName(className);
            const sortedStudents = data.data.sort((a, b) => a.fullName.localeCompare(b.fullName));
            setStudents(sortedStudents);
            setIsAllStudents(false);
            }
        } catch (err) {
            setError("שגיאה בטעינת רשימת התלמידות ");
        }
    }

    if (error) {
        return <div style={{color:"white"}}>{error}</div>;
    }

    return (
        <div style={{ padding: "24px", direction: "rtl", width: "100%" }}>
            <Button onClick={() => hendleGetStudentByClassName(className)} variant="contained" sx={{ backgroundColor: 'orange',  fontWeight: 700, fontSize: '16px', marginBottom: "16px" }}>{isAllStudents ? "הצג רק את התלמידות שלי" : "הצג את כל התלמידות"}</Button>
            <TableContainer component={Paper} sx={{ ...tableStyles }}>
                <Table sx={{ minWidth: 900 }}>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#2b2828" }}>
                            <TableCell align="center" sx={{...tableTitle}}>שם מלא</TableCell>
                            <TableCell align="center" sx={{...tableTitle}}>תעודת זהות</TableCell>
                            <TableCell align="center" sx={{...tableTitle}}>כיתה</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student.id} sx={{ "&:hover": { backgroundColor: "#2e2e2e" } }}>
                                <TableCell align="center" sx={{ color: "white" }}>{student.fullName}</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>{student.id}</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>{student.className}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default StudentsList;