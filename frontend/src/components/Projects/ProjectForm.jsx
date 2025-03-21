import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ProjectForm = () => {
  const { id } = useParams(); // Récupérer l'ID depuis l'URL
  const navigate = useNavigate(); // Permet de rediriger après soumission

  const [project, setProject] = useState({
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
    budget: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:3000/api/projects/${id}`)

        .then((response) => {
          setProject(response.data);
          console.log(response.data);
        })
        .catch((error) => console.error("Error fetching resource:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://127.0.0.1:3000/api/projects/${id}`, project);
        toast.success("project updated successfully!");
      } else {
        await axios.post("http://127.0.0.1:3000/api/projects", project);
        toast.success("project created successfully!");
      }
      navigate("/project"); // Redirection vers la liste
    } catch (error) {
      toast.error(error.response?.data?.error || "Error processing request");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border-8 border-orange-500">
      <h2 className="text-2xl font-semibold mb-4 text-center">New Project</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Project Name</label>
          <input
            type="text"
            name="projectName"
            value={project.projectName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={project.startDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block font-medium">End Date</label>
            <input
              type="date"
              name="endDate"
              value={project.endDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-medium">Budget</label>
          <input
            type="number"
            name="budget"
            value={project.budget}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div className="flex justify-between">
          <Link to="/project">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded"
              onClick={() =>
                setProject({
                  projectName: "",
                  description: "",
                  startDate: "",
                  endDate: "",
                  budget: "",
                })
              }
            >
              Cancel
            </button>
          </Link>

          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white rounded-lg"
          >
            {id ? "Update Project" : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
