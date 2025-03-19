import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {Link} from "react-router-dom";

function Resources() {

  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/resources");
        setResources(response.data); 
      } catch (error) {
        console.error(
          "Error fetching projects:",
          error.response?.data || error.message
        );
      }
    };

    fetchResources(); 
  }, []);






  return (
    <div>
      <div>
      
      <div className="flex justify-between items-center mb-6  mt-10 ">
        <h2 className="text-2xl font-semibold text-gray-800 mx-auto">Resources</h2>
        <Link to="/resourceform" className="mx-auto">
          <button className="bg-orange-600  text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-700 transition-colors">
            <Plus size={20} />
            <span>New Resources</span>
          </button>
        </Link>
      </div>
    </div>



{/* Table to display the list of projects */}
<div className="max-w-7xl mx-auto mt-10 p-6   shadow-lg ">
        <h2 className="text-2xl font-semibold mb-9 text-center ">
           Resource List
        </h2>

        <table className="min-w-full table-auto ">
          <thead>
            <tr >
              <th className="px-4 py-2 border-b text-left">Resource Name </th>
              <th className="px-4 py-2 border-b text-left">Select a type</th>
              <th className="px-4 py-2 border-b text-left">Quantity</th>
              <th className="px-4 py-2 border-b text-left">Supplier</th>
            </tr>
          </thead>
          <tbody>
            {resources.length > 0 ? (
              resources.map((resource) => (
                <tr key={resources._id}>
                  <td className="px-4 py-2 border-b">{resource.resourceName}</td>
                  <td className="px-4 py-2 border-b">{resource.type}</td>
                  <td className="px-4 py-2 border-b">{resource.quantity}</td>
                  <td className="px-4 py-2 border-b">{resource.supplier}</td>
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
  )
}

export default Resources
