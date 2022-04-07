import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { HomeContext } from "../../../context/homeContext";
import { HomeTab } from "../../../models/home_model";
import { tabBarTitle } from "../../../utils";

interface props {
  items: HomeTab[];
  selected: HomeTab;
}
const Menu: React.FC<props> = ({ items, selected }) => {
  const { tasks } = useContext(HomeContext);
  return (
    <ul className="mt-4 font-arabic space-y-2">
      {items.map((i) => (
        <li key={i} className="flex items-stretch">
          {i == selected && (
            <div className="w-1 rounded-r-full bg-indigo-200 h-auto"></div>
          )}

          <Link
            to={i}
            className={`w-full  py-3 pr-4 text-right
            flex-1 ${
              i == selected ? "bg-indigo-100 text-indigo-800" : "text-slate-700"
            }
            ${!tasks.length  ? "" : "pointer-events-none text-slate-400"}
            
            `}
          >
            {tabBarTitle(i)}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
