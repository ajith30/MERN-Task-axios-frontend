import { createContext, useEffect, useState } from "react";
import api from "../api/management";

//Intializing context
const TeachersContext = createContext();

//Creating Context Provider
export const TeachersProvider = ({children}) => {
    const [teachers, setTeachers] = useState([]);

    //Creating below state for getting the data of the perticular teacher when edit is clicked
    const [editTeacherData, setEditTeacherData] = useState({
        teacher: {},
        edit: false
    });

    //Handeling Brwoser back Event: To prevent Add Form filled with last visited teacher data. 
    //when we edit the course and not sumbitting and clicking browser back. 
    useEffect(() => {
        window.onpopstate = (e) => {
            setEditTeacherData({
                teacher: {},
                edit: false
            })
        }
    });

    //useEffect() -Fetch the students once
    useEffect(() => {
        fetchTeachers();
    }, []);

    //Fetch the teachers from json server using axios
    const fetchTeachers = async () => {
        try {
            const response = await api.get("/teachers?_sort=id&_order=desc");
            setTeachers(response.data);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
        
    } 

    //Add teacher
    const addTeacher = async (newTeacher) => {
        try {
            const response = await api.post("/teachers", newTeacher);
            setTeachers([response.data, ...teachers]);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    //Edit teacher
    const editTeacher = (teacher) => {
        setEditTeacherData({
            teacher,
            edit: true
        });
    }

    //Update teacher
    const updateTeacher = async (id, updateTeacher) => {
        try {
            const response = await api.put(`teachers/${id}`, updateTeacher);
            setTeachers(teachers.map((teacher) => {
                return (teacher.id === id) ? {...teacher, ...response.data} : teacher;
            }))
        } catch (error) {
            console.log(`Error: ${error}`);
        }

    }

    //Delete teacher
    const deleteTeacher = async (id) => {
        if(window.confirm("Are you sure you want to delete this Teacher ?")) {
            try {
                await api.delete(`teachers/${id}`);
                setTeachers(teachers.filter((teacher) => {
                    return teacher.id !== id;
                }));
            } catch (error) {
                console.log(`Error: ${error}`);
            }

        }
    }

    return(
        //passing the states/Func which will be used by children components
        <TeachersContext.Provider value={{
            teachers,
            addTeacher,
            editTeacher,
            editTeacherData,
            updateTeacher,
            deleteTeacher
        }}>
            {children}
        </TeachersContext.Provider>
    );
}

export default TeachersContext;