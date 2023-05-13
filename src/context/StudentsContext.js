import { createContext, useEffect, useState } from "react";
import api from "../api/management";

//Initializing Context
const StudentsContext = createContext();

//creating context provider
export const StudentsProvider = ({children}) => {
    const [students, setStudents] = useState([]);

    //Creating below state for getting the data of the perticular teacher when edit is clicked
    const [editStudentData, setEditStudentData] = useState({
        student: {},
        edit: false
    })

    //Handeling Brwoser back Event: To prevent Add Form filled with last visited student data. 
    //when we edit the course and not sumbitting and clicking browser back. 
    useEffect(() => {
        window.onpopstate = (e) => {
            setEditStudentData({course: {}, edit: false});
        }
    });

    //useEffect() -Fetch the students once
    useEffect(() => {
        fetchStudents();
    }, []);

    //Fetch the students from json server using axios
    const fetchStudents = async () => {
        try {
            const response  = await api.get("/students?_sort=id&_order=desc");
            setStudents(response.data);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }


    //Add Student
    const addStudent = async (newStudent) => {
        try {
            const response = await api.post("/students", newStudent);
            setStudents([response.data, ...students]);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    //Edit Student
    const editStudent = (student) => {
        setEditStudentData({
            student,
            edit: true,
        })
    }

    //Update Student
    const updateStudent = async (id, updateStudent) => {
        try {
            const response = await api.put(`/students/${id}`, updateStudent);
            setStudents(students.map((student) => {
                return (student.id === id) ? {...student, ...response.data} : student;
            }));
        } catch (error) {
            console.log(`Error: ${error}`);
        }

    }

    //Delete Student
    const deleteStudent = async (id) => {
        try {
            if(window.confirm("Are you sure you want to delete this student ?")) {
                await api.delete(`/students/${id}`);
                setStudents(
                    students.filter((student) => {
                    return student.id !== id;
                }));
            }
        } catch (error) {
            console.log(error)
        }

    }


    return(
        //passing the states/Func which will be used by children components
        <StudentsContext.Provider value={{
            students,
            addStudent,
            editStudentData,
            editStudent,
            updateStudent,
            deleteStudent
        }}>
            {children}
        </StudentsContext.Provider>
    );

}

export default StudentsContext;