import React from 'react'
import { Plus, Pencil, Trash2 } from "lucide-react";
import {Link} from "react-router-dom";

function Resources() {
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
    </div>
  )
}

export default Resources
