import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Context from "../context/StudentsContext";

function StudentForm() {
    const {addStudent, editStudentData, updateStudent} = useContext(Context);

    const [image, setImage] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const navigate = useNavigate();

    //Side Effect with useEffect() -Hook. This will fill the form with exitsting data for Edit.
    useEffect(() => {
        if(editStudentData.edit === true) {
            setImage(editStudentData.student.image);
            setFirstName(editStudentData.student.firstName);
            setLastName(editStudentData.student.lastName);
            setEmail(editStudentData.student.email);
            setPhone(editStudentData.student.phone);
        }
    }, [editStudentData]);


    const handleSubmit = (e) => {
        e.preventDefault();

        const newStudent = {
            image,
            firstName,
            lastName,
            email,
            phone
        }

        if(editStudentData.edit === true) {
            updateStudent(editStudentData.student.id, newStudent);
            editStudentData.edit = false;
        } else {
            addStudent(newStudent);
        }
        
        //Resetting the form after after Submit
        setImage("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");

        //Redirecting to Students page
        navigate("/students");
  
    }

    return(
        <Box flex={6} p={2} mt={10} >
            <Box sx={{display: "flex", justifyContent: "center"}}>
                <form onSubmit={handleSubmit}>
                    <TextField id="filled-basic" sx={{width: 500, mb:2}}  label="First Name" variant="filled" value={firstName} onChange={(e) => {setFirstName(e.target.value)}}  required/>
                    <br />
                    <TextField id="filled-basic" sx={{width: 500, mb:2}}  label="Last Name" variant="filled" value={lastName} onChange={(e) => {setLastName(e.target.value)}}  required/>
                    <br />
                    <TextField id="filled-basic" sx={{width: 500, mb:2}}  label="Enter Profile URL" variant="filled" value={image} onChange={(e) => {setImage(e.target.value)}} required/>
                    <br />
                    <TextField id="filled-basic" sx={{width: 500, mb:2}}  label="Email" variant="filled" value={email} onChange={(e) => {setEmail(e.target.value)}}  required/>
                    <br />
                    <TextField id="filled-basic" sx={{width: 500, mb:2}}  label="Phone" variant="filled" value={phone} onChange={(e) => {setPhone(e.target.value)}}  required/>
                    <br />
                    <Box sx={{display: "flex", justifyContent: "center"}}>
                    {(editStudentData.edit === false) 
                            ? <Button type="submit" variant="outlined" sx={{mb: 3}} >Add Student</Button>
                            : <Button type="submit" variant="outlined" sx={{mb: 3}} >Update Student</Button> 
                        }
                    </Box>
                </form>
            </Box>
        </Box>
    );
}

export default StudentForm;