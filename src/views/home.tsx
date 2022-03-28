import React, { useContext, useEffect, useRef } from "react";
import { HomeContext } from "../context/homeContext";
import { ChevronsDown, Loader } from "react-feather";

import NameLabel from "../components/home/navigation/nameLabel";
import TabBar from "../components/home/navigation/tabbar";
import { HomeTab } from "../models/home_model";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import SelectRole from "../components/home/navigation/selectRole";
import PhoneMenu from "../components/home/navigation/phoneMenu";
import Menu from "../components/home/navigation/menu";

const Home: React.FC = ({ children }) => {
  const { teacher, selectTab, tab, selectRole, currentRole } =
    useContext(HomeContext);
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
    <div className="w-screen min-h-screen flex  bg-slate-100">
      <div className="flex-1 flex flex-col">
        <div className="px-4 flex-col-reverse p-2 bg-white md:bg-transparent md:flex-row font-arabic md:h-16 w-full  flex items-center justify-between">
          <div className="w-full pr-2 md:w-auto justify-end flex">

            <SelectRole
              current={teacher?.currentRole!}
              options={teacher?.role!}
              select={() => {}}
            />
            <PhoneMenu items={tabs} selected={tab} />

          </div>
          <div className="flex w-full md:w-auto md:space-x-2 justify-between md:justify-center">
            <button className="rounded-full   text-indigo-600 bg-indigo-200 px-6 text-center flex items-center">
              Pro
            </button>
            <NameLabel name={teacher?.name} />
          </div>
        </div>
        <div className="w-full flex-1 p-4"></div>
        <div></div>
      </div>
      <nav className="max-w-xs hidden md:block w-full bg-slate-50 shadow-md">
        <div className="pr-4 h-16 w-full bg-red-400 flex items-center justify-end">
          <span className="font-arabic text-xl text-center">نور</span>
        </div>

        <Menu items={tabs} selected={tab}/>
      </nav>
    </div>
  );
};

export default Home;
