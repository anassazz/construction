import React from "react";
import { Building2, ListTodo, Package } from "lucide-react";
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-orange-600 shadow-sm ">
        <div className="max-w-7xl mx-auto px-4 ">
          <div className="flex space-x-20 text-white">
            <Link to="/project">
                <button>
                <Building2 size={36} />
                <span>Projects</span>
                </button>
            </Link>

            <Link to ="/tasks">
            <button>
              <ListTodo size={36} />
              <span>Tasks</span>
            </button>
            </Link>


           <Link to ="/resource">
           <button>
              <Package size={36} />
              <span>Resources</span>
            </button>
           </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
