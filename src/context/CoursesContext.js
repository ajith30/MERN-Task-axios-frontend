import { createContext, useEffect, useState } from "react";
import api from "../api/management";

//Initializing context
const CoursesContext = createContext();

////Creating Context Provider
export const CoursesProvider = ({children}) => {
    
    const [courses, setCourses] = useState([]);

    //Creating below state for getting the data of the perticular teacher when edit is clicked
    const [editCourseData, setEditCourseData] = useState({
        course: {},
        edit: false
    });


    //Handeling Brwoser back Event: To prevent Add Form filled with last visited course data. 
    //when we edit the course and not sumbitting and clicking browser back. 
    useEffect(() => {
        window.onpopstate = (e) => {
            setEditCourseData({course: {}, edit: false});
        }
    });

    //useEffect() -Fetch the students once
    useEffect(() => {
        fetchCourses();
    }, []);
    
    //Fetch the courses from json server using axios
    const fetchCourses = async () => {
        try {
            const response = await api.get("/courses?_sort=id&_order=desc");
            setCourses(response.data);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }
    //Add Course
    const addCourse = async (newCourse) => {
        try {
            const response = await api.post("/courses", newCourse)
            setCourses([response.data, ...courses]);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    //Edit Course clicked get that course data
    const editCourse = (course) => {
        setEditCourseData({
            course,
            edit: true
        });
    }

    //Update Course
    const updateCourse = async (id, updateCourse) => {
        try {
            const response = await api.put(`/courses/${id}`, updateCourse);
            setCourses(courses.map((course) => {
                return (course.id === id) ? {...course, ...response.data} : course;
            }));
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    //Delete Course
    const deleteCourse = async (id) => {
        try {
            if(window.confirm("Are you sure you want to delete this Course ?")) {
                await api.delete(`/courses/${id}`);
                setCourses(courses.filter((course) => {
                    return course.id !== id;
                }));
            }
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    return(
        <CoursesContext.Provider value={{
            courses,
            addCourse,
            editCourse,
            editCourseData,
            updateCourse,
            deleteCourse
        }}>
            {children}
        </CoursesContext.Provider>
    );
}

export default CoursesContext;
