import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error(
          "Error fetching projects:",
          error.response?.data || error.message
        );
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6  mt-10 ">
        <h2 className="text-2xl font-semibold text-gray-800 mx-auto">Tasks</h2>
        <Link to="/taskform" className="mx-auto">
          <button className="bg-orange-600  text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-700 transition-colors">
            <Plus size={20} />
            <span>Task New </span>
          </button>
        </Link>
      </div>

      {/* Table to display the list of projects */}
      <div className="max-w-7xl mx-auto mt-10 p-6   shadow-lg ">
        <h2 className="text-2xl font-semibold mb-9 text-center ">Tasks List</h2>

        <table className="min-w-full table-auto ">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Project </th>
              <th className="px-4 py-2 border-b text-left">Description</th>
              <th className="px-4 py-2 border-b text-left">Start Date</th>
              <th className="px-4 py-2 border-b text-left">End Date</th>
              <th className="px-4 py-2 border-b text-left ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task._id}>
                  <td className="px-4 py-2 border-b">{task.projectName}</td>
                  <td className="px-4 py-2 border-b">{task.description}</td>
                  <td className="px-4 py-2 border-b">{task.startDate}</td>
                  <td className="px-4 py-2 border-b">{task.endDate}</td>
                  <td className="px-4 py-2 border-b flex space-x-2">
                    <button className="text-orange-500 hover:text-orange-700 ">
                      <Pencil size={23} />
                    </button>
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

export default Tasks;
