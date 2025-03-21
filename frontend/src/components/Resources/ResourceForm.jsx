import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ResourceForm = () => {
  const { id } = useParams(); // Récupérer l'ID depuis l'URL
  const navigate = useNavigate(); // Permet de rediriger après soumission

  const [projects, setProjects] = useState([]); // Stocke la liste des projets
  const [resource, setResource] = useState({
    project: "", // Stocke l'ID du projet
    projectName: "", // Stocke le nom du projet
    resourceName: "",
    type: "",
    quantity: "",
    supplier: "",
  });

  useEffect(() => {
    // Charger la liste des projets
    axios.get("http://127.0.0.1:3000/api/projects")
      .then((response) => setProjects(response.data))
      .catch((error) => console.error("Error fetching projects:", error));

    // Si un ID est présent, charger la ressource existante
    if (id) {
      axios.get(`http://127.0.0.1:3000/api/resources/${id}`)
        .then((response) => setResource(response.data))
        .catch((error) => console.error("Error fetching resource:", error));
    }
  }, [id]);

  useEffect(() => {
    if (resource.project) {
      const selectedProject = projects.find((p) => p._id === resource.project);
      if (selectedProject) {
        setResource((prev) => ({
          ...prev,
          projectName: selectedProject.projectName,
        }));
      }
    }
  }, [resource.project, projects]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "project") {
      const selectedProject = projects.find((p) => p._id === value);
      setResource({
        ...resource,
        project: value,
        projectName: selectedProject ? selectedProject.projectName : "",
      });
    } else {
      setResource({ ...resource, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://127.0.0.1:3000/api/resources/${id}`, resource);
        toast.success("Resource updated successfully!");
      } else {
        await axios.post("http://127.0.0.1:3000/api/resources", resource);
        toast.success("Resource created successfully!");
      }
      navigate("/resource"); // Redirection vers la liste
    } catch (error) {
      toast.error(error.response?.data?.error || "Error processing request");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md border-8 border-orange-500">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">{id ? "Edit Resource" : "New Resource"}</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Sélection du projet */}
        <div>
          <label className="block text-gray-600">Project</label>
          <select
            name="project"
            value={resource.project}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          >
            <option value="">Select a project</option>
            {projects.length > 0 ? (
              projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.projectName}
                </option>
              ))
            ) : (
              <option value="" disabled>No projects available</option>
            )}
          </select>
        </div>

        <div>
          <label className="block text-gray-600">Resource Name</label>
          <input
            type="text"
            name="resourceName"
            value={resource.resourceName}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter resource name"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600">Type</label>
          <select
            name="type"
            value={resource.type}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          >
            <option value="">Select a type</option>
            <option value="Matériel">Matériel</option>
            <option value="Equipment">Equipment</option>
            <option value="Software">Software</option>
            <option value="Logiciel">Logiciel</option>
            <option value="Humain">Humain</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-600">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={resource.quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter quantity"
            min="1"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600">Supplier</label>
          <input
            type="text"
            name="supplier"
            value={resource.supplier}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter supplier name"
            required
          />
        </div>

        <div className="flex justify-between mt-4">
          <Link to="/resource">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded"
              onClick={() => setResource({
                project: "",
                projectName: "",
                resourceName: "",
                type: "",
                quantity: "",
                supplier: "",
              })}
            >
              Cancel
            </button>
          </Link>

          <button
            type="submit"
            className="px-4 py-2 bg-orange-600 text-white rounded"
          >
            {id ? "Update Resource" : "Create Resource"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResourceForm;
