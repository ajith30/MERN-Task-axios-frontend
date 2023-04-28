import { Box, Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import Context from "../context/StudentsContext";
import {useContext} from "react";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Students() {
    const {students, editStudent, deleteStudent} = useContext(Context);

    const navigate = useNavigate();
    
  return (
    <Box flex={6} p={2} mt={10}>
        <TableContainer component={Paper} sx={{my: 3}}>
            <Table sx={{minWidth: 650}} >
                <TableHead>
                    <TableRow>
                        <TableCell align="center">S/No</TableCell>
                        <TableCell align="center">Profile</TableCell>
                        <TableCell align="center">First Name</TableCell>
                        <TableCell align="center">Last Name</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Phone</TableCell>
                        <TableCell align="center"colSpan={2}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((student, index) => {
                        return(
                            <TableRow key={index}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">
                                    <img className="profile-avatar" src={student.image} alt="prfile"  />
                                </TableCell>
                                <TableCell align="center">{student.firstName}</TableCell>
                                <TableCell align="center">{student.lastName}</TableCell>
                                <TableCell align="center">{student.email}</TableCell>
                                <TableCell align="center">{student.phone}</TableCell>
                                <TableCell>
                                    <Tooltip title="Edit" onClick={() => {
                                        navigate("/create-edit-student");
                                        editStudent(student);
                                        }}>
                                        <Fab size="medium" color="secondary" aria-label="edit">
                                            <Edit />
                                        </Fab>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    <Tooltip title="Delete" onClick={() => {deleteStudent(student.id)}}>
                                        <Fab size="medium" color="error" aria-label="dlete">
                                            <Delete />
                                        </Fab>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        <Box sx={{display:"flex", justifyContent: "center", my: 3}}>
            <Tooltip title="Add" onClick={() => navigate("/create-edit-student")}>
                <Fab size="medium" color="primary" aria-label="add">
                    <Add />
                </Fab>
            </Tooltip>
        </Box>
    </Box>
  )
}

export default Students;
