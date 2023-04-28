import Cards from "./Cards";
import student from "../images/students.png";
import teacher from "../images/teachers.png";
import course from "../images/courses.png";
import { Box, Button } from "@mui/material";
import { useContext } from "react";
import StudentsContext from "../context/StudentsContext";
import TeachersContext from "../context/TeachersContext";
import CoursesContext from "../context/CoursesContext";
import { Link } from "react-router-dom";

function Content() {
    const {students} = useContext(StudentsContext);
    const {teachers} = useContext(TeachersContext);
    const {courses} = useContext(CoursesContext);

    const datas = [
        {name: "Students", count: students.length, image: student},
        {name: "Teachers", count: teachers.length, image: teacher},
        {name: "Courses", count: courses.length, image: course},
    ]
    return(
        <>
            <Box flex={6} p={2} mt={10} >
                <Box sx={{display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 4, mt:5, mb: 10}}>
                    {datas.map((data, index) => {
                        return <Cards key={index} name={data.name} count={data.count} image={data.image} />
                    })}
                </Box>

                <Box sx={{display: "flex", justifyContent: "space-around", flexWrap: "wrap"}}>
                    <Button component={Link} to="/students" sx={{display: "block", m:2}} variant="contained" color="secondary">Manage Students</Button>
                    <Button component={Link} to="/teachers" sx={{display: "block", m:2}} variant="contained" color="secondary">Manage Teachers</Button>
                    <Button component={Link} to="/courses" sx={{display: "block", m:2}} variant="contained" color="secondary">Manage Courses</Button>
                </Box>

            </Box>
        </>
    );
}

export default Content;