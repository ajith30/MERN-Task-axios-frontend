import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import CoursesContext from "../context/CoursesContext";
import { useNavigate } from "react-router-dom";

function CourseForm() {
    const {addCourse, editCourseData, updateCourse} = useContext(CoursesContext);

    const [image, setImage] = useState("");
    const [courseName, setCourseName] = useState("");

    const navigate = useNavigate();

    //Side Effect with useEffect() -Hook. This will fill the form with exitsting data for Edit.
    useEffect(() => {
        if(editCourseData.edit === true) {
            setImage(editCourseData.course.image);
            setCourseName(editCourseData.course.courseName);
        }
    },[editCourseData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newCourse = {
            image,
            courseName
        }

        if(editCourseData.edit === true) {
            updateCourse( editCourseData.course.id, newCourse);
            editCourseData.edit = false;
        } else {
            addCourse(newCourse);
        }
        

        //Resetting the form once submitted.
        setImage("");
        setCourseName("");

        //Redirecting to courses page
        navigate("/courses");
    }

    return(
        <Box flex={6} p={2} mt={10} >
            <Box sx={{display: "flex", justifyContent: "center"}}>
                <form onSubmit={handleSubmit}>

                    <TextField id="filled-basic" sx={{width: 500, mb:2}}  label="Enter Course Image URL" variant="filled" value={image} onChange={(e) => {setImage(e.target.value)}} required/>
                    <br />
                    <TextField id="filled-basic" sx={{width: 500, mb:2}}  label="Course Name" variant="filled" value={courseName} onChange={(e) => {setCourseName(e.target.value)}}  required/>
                    <br />

                    <Box sx={{display: "flex", justifyContent: "center"}}>
                        {(editCourseData.edit === false) 
                            ? <Button type="submit" variant="outlined" sx={{mb: 3}} >Add Course</Button>
                            : <Button type="submit" variant="outlined" sx={{mb: 3}} >Update Course</Button>
                        }
                    </Box>
                </form>
            </Box>
         </Box>
    );
}

export default CourseForm;