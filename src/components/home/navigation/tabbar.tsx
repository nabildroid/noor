import { Tab } from "@headlessui/react";
import React from "react";
import { Link } from "react-router-dom";
import { HomeTab } from "../../../models/home_model";
import { tabBarTitle } from "../../../utils";

interface TabBarProps {
  tabs: HomeTab[];
  selected: HomeTab;
}

const TabBar: React.FC<TabBarProps> = ({ tabs, selected }) => {
  return (
    <div className="h-16 flex max-w-sm w-full justify-center items-center">
      {tabs.map((e) => {
        console.log(e,selected);
        const active = e == selected;
        return (
          <Link
            to={e}
            className="flex -mb-1 -mt-1 h-full  hover:bg-indigo-300 flex-col items-center            "
          >
            <span
              className={`flex-1 ${
                active ? "-mb-1" : ""
              } px-4 h-full flex text-center items-center`}
            >
              {tabBarTitle(e)}
            </span>
            {active && (
              <div className="w-full h-1 rounded-t-full bg-indigo-600 "></div>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default TabBar;
