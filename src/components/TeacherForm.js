import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import TeachersContext from "../context/TeachersContext";
import { useNavigate } from "react-router-dom";


function TeacherForm() {
    const {addTeacher, editTeacherData, updateTeacher} = useContext(TeachersContext);

    const [image, setImage] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const navigate = useNavigate();

    //Side Effect with useEffect() -Hook. This will fill the form with exitsting data for Edit.
    useEffect(() => {
        if(editTeacherData.edit === true) {
            setImage(editTeacherData.teacher.image);
            setFirstName(editTeacherData.teacher.firstName);
            setLastName(editTeacherData.teacher.lastName);
            setEmail(editTeacherData.teacher.email);
            setPhone(editTeacherData.teacher.phone);
        }
    }, [editTeacherData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTeacher = {
            image,
            firstName,
            lastName,
            email,
            phone
        }

        if(editTeacherData.edit === true) {
            updateTeacher(editTeacherData.teacher.id, newTeacher);
            editTeacherData.edit = false;
        } else {
            addTeacher(newTeacher);
        }
        

        //Resetting the form once submitted
        setImage("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");

        //Redirecting to Teachers page
        navigate("/teachers");
    }


    return (
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
                        {(editTeacherData.edit === false) 
                            ? <Button type="submit" variant="outlined" sx={{mb: 3}} >Add Teacher</Button>
                            : <Button type="submit" variant="outlined" sx={{mb: 3}} >Update Teacher</Button> 
                        }
                    </Box>
                </form>
            </Box>
        </Box>
    );
}

export default TeacherForm;
