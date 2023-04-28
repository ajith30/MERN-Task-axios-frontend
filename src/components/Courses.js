import { Box, Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import {useContext} from "react";
import { Add, Delete, Edit } from "@mui/icons-material";
import CoursesContext from "../context/CoursesContext";
import { useNavigate } from "react-router-dom";

function Courses() {
    const {courses, editCourse, deleteCourse} = useContext(CoursesContext);

    const navigate = useNavigate();

    return(
        <Box flex={6} p={2} mt={10}>
        <TableContainer component={Paper} sx={{my: 3}}>
            <Table sx={{minWidth: 650}} >
                <TableHead>
                    <TableRow>
                        <TableCell align="center">S/No</TableCell>
                        <TableCell align="center">Course</TableCell>
                        <TableCell align="center">Course Name</TableCell>
                        <TableCell align="center"colSpan={2}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {courses.map((course, index) => {
                        return(
                            <TableRow key={index}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">
                                    <img className="profile-avatar" src={course.image} alt="prfile"  />
                                </TableCell>
                                <TableCell align="center">{course.courseName}</TableCell>
                                <TableCell>
                                    <Tooltip title="Edit" onClick={() => {
                                        navigate("/create-edit-course");
                                        editCourse(course);
                                        }}>
                                        <Fab size="medium" color="secondary" aria-label="edit">
                                            <Edit />
                                        </Fab>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    <Tooltip title="Delete" onClick={() => {deleteCourse(course.id)}}>
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
            <Tooltip title="Add" onClick={() => {navigate("/create-edit-course")}}>
                <Fab size="medium" color="primary" aria-label="add">
                    <Add />
                </Fab>
            </Tooltip>
        </Box>
    </Box>
    );
}

export default Courses;