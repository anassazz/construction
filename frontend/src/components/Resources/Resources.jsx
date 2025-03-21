import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

function Resources() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/api/resources");
      setResources(response.data);
    } catch (error) {
      console.error(
        "Error fetching resources:",
        error.response?.data || error.message
      );
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      try {
        await axios.delete(`http://127.0.0.1:3000/api/resources/${id}`);
        setResources(resources.filter((resource) => resource._id !== id));
      } catch (error) {
        console.error(
          "Error deleting resource:",
          error.response?.data || error.message
        );
      }
    }
  };

  return (
    <div>
      <div>
        <div className="flex justify-between items-center mb-6  mt-10 ">
          <h2 className="text-2xl font-semibold text-gray-800 mx-auto">
            Resources
          </h2>
          <Link to="/resourceform" className="mx-auto">
            <button className="bg-orange-600  text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-700 transition-colors">
              <Plus size={20} />
              <span>New Resources</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Table to display the list of projects */}
      <div className="max-w-7xl mx-auto mt-10 p-6   shadow-lg  ">
        <h2 className="text-2xl font-semibold mb-9 text-center ">
          Resource List
        </h2>

        <table className="min-w-full table-auto ">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left ">project</th>
              <th className="px-4 py-2 border-b text-left">Resource Name </th>
              <th className="px-4 py-2 border-b text-left">Select a type</th>
              <th className="px-4 py-2 border-b text-left">Quantity</th>
              <th className="px-4 py-2 border-b text-left">Supplier</th>
              <th className="px-4 py-2 border-b text-left ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.length > 0 ? (
              resources.map((resource) => (
                <tr key={resources._id}>
                  <td className="px-4 py-2 border-b">{resource.projectName}</td>

                  <td className="px-4 py-2 border-b">
                    {resource.resourceName}
                  </td>
                  <td className="px-4 py-2 border-b">{resource.type}</td>
                  <td className="px-4 py-2 border-b">{resource.quantity}</td>
                  <td className="px-4 py-2 border-b">{resource.supplier}</td>
                  <td className="px-4 py-2 border-b flex space-x-2">
                    <Link to={`/resourceform/${resource._id}`}>
                      <button className="text-orange-500 hover:text-orange-700 ">
                        <Pencil size={23} />
                      </button>
                    </Link>

                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(resource._id)}
                    >
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
}

export default Resources;
