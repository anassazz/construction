import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/projects");
        setProjects(response.data);
      } catch (error) {
        console.error(
          "Error fetching projects:",
          error.response?.data || error.message
        );
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      {/* Header and button to create new project */}
      <div className="flex justify-between items-center mb-6 mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mx-auto">
          Projects
        </h2>
        <Link to="/projectform" className="mx-auto">
          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-700 transition-colors">
            <Plus size={20} />
            <span>New Project</span>
          </button>
        </Link>
      </div>

      {/* Table to display the list of projects */}
      <div className="max-w-7xl mx-auto mt-10 p-6   shadow-lg ">
        <h2 className="text-2xl font-semibold mb-9 text-center ">
          Project List
        </h2>

        <table className="min-w-full table-auto ">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Project Name</th>
              <th className="px-4 py-2 border-b text-left">Description</th>
              <th className="px-4 py-2 border-b text-left">Start Date</th>
              <th className="px-4 py-2 border-b text-left">End Date</th>
              <th className="px-4 py-2 border-b text-left">Budget</th>
              <th className="px-4 py-2 border-b text-left ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? (
              projects.map((project) => (
                <tr key={project._id}>
                  <td className="px-4 py-2 border-b">{project.projectName}</td>
                  <td className="px-4 py-2 border-b">{project.description}</td>
                  <td className="px-4 py-2 border-b">{project.startDate}</td>
                  <td className="px-4 py-2 border-b">{project.endDate}</td>
                  <td className="px-4 py-2 border-b">{project.budget}</td>
                  <td className="px-4 py-2 border-b flex space-x-2">


                    <Link to = {`/projectform/${project._id}`}>
                    <button className="text-orange-500 hover:text-orange-700 ">
                      <Pencil size={23} />
                    </button>
                    </Link>
                    




                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 size={23} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 border-b text-center">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
