import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link ,useParams, useNavigate} from "react-router-dom";
import { toast } from "react-hot-toast";

const TaskForm = () => {

  const { id } = useParams(); // Récupérer l'ID depuis l'URL
  const navigate = useNavigate(); // Permet de rediriger après soumission

  const [task, setTask] = useState({
    project: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:3000/api/tasks/${id}`)
        .then((response) => {
          setTask(response.data);
        })
        .catch((error) => console.error("Error fetching task:", error));
    }
    axios
      .get("http://127.0.0.1:3000/api/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (task.endDate && task.startDate > task.endDate) {
      toast.error("End Date cannot be before Start Date.");
      return;
    }

    try {
      if (id) {
        await axios.put(`http://127.0.0.1:3000/api/tasks/${id}`, task);
        toast.success("Task updated successfully!");
      } else {
        await axios.post("http://127.0.0.1:3000/api/tasks", task);
        toast.success("Task created successfully!");
      }
      navigate("/tasks"); 
    } catch (error) {
      toast.error(error.response?.data?.error || "Error processing request");
    }
  };

  
  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md border-8 border-orange-500">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">New Task</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-600">Project</label>
          <select
            name="project"
            value={task.project}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          >
            <option value="">Select a project</option>
            {projects.length > 0 ? (
              projects.map((project) => (
                <option key={project._id} value={project._id}> {/* Utilisez _id comme valeur */}
                  {project.projectName}
                </option>
              ))
            ) : (
              <option value="">No projects available</option>
            )}
          </select>
        </div>

        <div>
          <label className="block text-gray-600">Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="Task details..."
            required
          />
        </div>

        <div>
          <label className="block text-gray-600">Start Date</label>
          <input
            type="date"
            value={task.startDate}
            onChange={handleChange}
            name="startDate"
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600">End Date</label>
          <input
            type="date"
            name="endDate"
            value={task.endDate}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>

        <div className="flex justify-between mt-4">

          <Link to="/tasks">
          <button
            type="button"
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
          </Link>
          

          <button
            type="submit"
            className="px-4 py-2 bg-orange-600 text-white rounded"
          >
            
            {id ? "Update Task" : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
