import { Box, Stack, ThemeProvider, createTheme } from "@mui/material";
import Content from "./components/Content";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Students from "./components/Students";
import Teachers from  "./components/Teachers";
import Courses from "./components/Courses";
import NotFound from "./components/NotFound";
import { Route, Routes } from "react-router-dom"
import { StudentsProvider } from "./context/StudentsContext";
import StudentForm from "./components/StudentForm";
import { TeachersProvider } from "./context/TeachersContext";
import TeacherForm from "./components/TeacherForm";
import CourseForm from "./components/CourseForm";
import {CoursesProvider} from "./context/CoursesContext";
import { useState } from "react";


function App() {
  //Dark and light mode by using theme
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor="background.default" color="text.primary" minHeight="100vh">
        <Navbar />
          <Stack direction="row" justifyContent="space-between">
              <Sidebar mode={mode} setMode={setMode} />
              <StudentsProvider>
                <TeachersProvider>
                  <CoursesProvider>
                    <Routes>
                      <Route path="/" element={<Content />}></Route>
                      
                      <Route path="/students" element={<Students />}></Route>
                      <Route path="/create-edit-student" element={<StudentForm />}></Route>
                  
                      <Route path="/teachers" element={<Teachers />}></Route>
                      <Route path="/create-edit-teacher" element={<TeacherForm />}></Route>
                    

                      <Route path="/courses" element={<Courses />}></Route>
                      <Route path="/create-edit-course" element={<CourseForm />}></Route>
                      

                      <Route path="*" element={<NotFound />}></Route>
                    </Routes>
                  </CoursesProvider>
                </TeachersProvider>
              </StudentsProvider>
          </Stack>
          {}
      </Box>
    </ThemeProvider>
  );
}

export default App;
