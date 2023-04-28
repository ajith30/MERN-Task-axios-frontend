import { Box, Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import TeachersContext from "../context/TeachersContext";
import {useContext} from "react";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Teachers() {
  const {teachers, editTeacher, deleteTeacher} = useContext(TeachersContext);
  
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
                    {teachers.map((teacher, index) => {
                        return(
                            <TableRow key={index}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">
                                    <img className="profile-avatar" src={teacher.image} alt="prfile"  />
                                </TableCell>
                                <TableCell align="center">{teacher.firstName}</TableCell>
                                <TableCell align="center">{teacher.lastName}</TableCell>
                                <TableCell align="center">{teacher.email}</TableCell>
                                <TableCell align="center">{teacher.phone}</TableCell>
                                <TableCell>
                                    <Tooltip title="Edit" onClick={() => {
                                        navigate("/create-edit-teacher");
                                        editTeacher(teacher);
                                        }}>
                                        <Fab size="medium" color="secondary" aria-label="edit">
                                            <Edit />
                                        </Fab>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    <Tooltip title="Delete" onClick={() => {deleteTeacher(teacher.id)}} >
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
            <Tooltip title="Add" onClick={() => {navigate("/create-edit-teacher")}}>
                <Fab size="medium" color="primary" aria-label="add">
                    <Add />
                </Fab>
            </Tooltip>
        </Box>
    </Box>
  )
}

export default Teachers;
