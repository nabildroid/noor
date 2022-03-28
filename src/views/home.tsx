import React, { useContext, useEffect, useRef } from "react";
import { HomeContext } from "../context/homeContext";
import { ChevronsDown, Loader } from "react-feather";

import NameLabel from "../components/home/navigation/nameLabel";
import TabBar from "../components/home/navigation/tabbar";
import { HomeTab } from "../models/home_model";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import SelectRole from "../components/home/navigation/selectRole";

const Home: React.FC = ({ children }) => {
  const { teacher, selectTab, tab, selectRole,currentRole } = useContext(HomeContext);
  const { pathname } = useLocation();
  const tabs = [HomeTab.saveAllDegrees, HomeTab.savedReports];
  const navigate = useNavigate();
  useEffect(() => {
    const [route] = pathname.split("/").filter((e) => e);

    console.log(tabs.some((e) => e == route) && route != tab);
    if (tabs.some((e) => e == route) && route != tab) {
      console.log("selecting ..", route);
      selectTab(route as any);
    } else {
      navigate(tabs[0]);
    }
  }, [pathname]);

  return (
    <div className="w-screen min-h-screen flex flex-col bg-indigo-100">
      <nav className="px-20  border-b border-slate-300 flex justify-between items-center">
        <NameLabel name={teacher?.name} />

        <TabBar selected={tab} tabs={tabs} />

        <SelectRole
          current={currentRole || ""}
          options={teacher?.role || []}
          select={selectRole}
        />
      </nav>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
