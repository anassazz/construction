import Navbar from "./components/Navbare/Navbar";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Projects from "./components/Projects/Projects";
import Tasks from "./components/Tasks/Tasks";
import Resources from "./components/Resources/Resources";
import ProjectForm from "./components/Projects/ProjectForm";
import TaskForm from "./components/Tasks/TaskForm";
import ResourceForm from "./components/Resources/ResourceForm";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 6000,
          style: {
            background: "white",
            color: "black",
            fontSize: "18px",
            padding: "16px",
            width: "400px",
            borderRadius: "10px",
            border: "2px solid #FFA500", // Orange
          },
        }}
      />

      <Navbar></Navbar>
      <Routes>
        <Route path="/project" element={<Projects></Projects>} />
        <Route path="/tasks" element={<Tasks></Tasks>} />
        <Route path="/resource" element={<Resources></Resources>} />

        <Route path="/projectform" element={<ProjectForm></ProjectForm>} />
        <Route path="/taskform" element={<TaskForm></TaskForm>} />
        <Route path="/resourceform" element={<ResourceForm></ResourceForm>} />
      </Routes>
    </>
  );
}

export default App;
