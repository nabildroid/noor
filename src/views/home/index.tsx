import React, { useCallback, useContext, useEffect, useRef } from "react";
import { HomeContext } from "../../context/homeContext";
import { ChevronsDown, Loader } from "react-feather";

import NameLabel from "../../components/home/navigation/nameLabel";
import TabBar from "../../components/home/navigation/tabbar";
import { HomeTab } from "../../models/home_model";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import SelectRole from "../../components/home/navigation/selectRole";
import PhoneMenu from "../../components/home/navigation/phoneMenu";
import Menu from "../../components/home/navigation/menu";
import Noti from "../../components/home/noti";
import BuyMessage from "../../components/home/buyMessage";
import { KinderRating, RateToId } from "../../models/rating";
import { taskTitle } from "../../utils";

const Home: React.FC = ({ children }) => {
  const {
    teacher,
    tasks,
    loading,
    selectTab,
    tab,
    tabs,
    selectRole,
    currentRole,
  } = useContext(HomeContext);

  const isProMessage =
    teacher?.isPro === true
      ? "PRO"
      : teacher?.isPro === false
      ? "buy"
      : teacher?.isPro;

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const correctNavigation = useCallback(
    (route: string) => {
      console.log(route, tabs);
      if (tabs.some((e) => e == route) && route != tab) {
        selectTab(route as any);
      } else if (route != undefined) {
        navigate(tabs[0]);
      }
    },
    [selectTab, navigate, tab, tabs[0]]
  );

  useEffect(() => {
    const [route] = pathname.split("/").filter((e) => e);
    correctNavigation(route);
  }, [pathname, tabs]);

  return (
    <div className="min-h-screen flex  bg-slate-100">
      <div className="flex-1 flex flex-col">
        <div className="px-4 flex-col-reverse p-2 bg-white md:bg-transparent md:flex-row font-arabic md:h-16 w-full  flex items-center justify-between">
          <div className="w-full pr-2 md:w-auto justify-end flex">
            <SelectRole
              current={currentRole}
              options={teacher?.role}
              select={selectRole}
            />
            <PhoneMenu items={tabs} selected={tab} />
          </div>
          <div className="flex w-full md:w-auto md:space-x-2 justify-between md:justify-center">
            <button
              className={`rounded-full
                ${
                  teacher?.isPro === false
                    ? "text-yellow-600 bg-yellow-200 shadow-xl animate-bounce"
                    : ""
                }
                ${
                  typeof teacher?.isPro == "string"
                    ? "text-green-600 bg-green-200"
                    : ""
                }
                ${
                  teacher?.isPro === true ? "text-indigo-600 bg-indigo-200" : ""
                }
             px-6 text-center flex items-center`}
            >
              <span className="-mb-1">{isProMessage}</span>
            </button>
            <NameLabel name={teacher?.name} />
          </div>
        </div>

        <div className="w-full overflow-hidden  flex-1 p-4">
          {!!tasks.length && (
            <Noti 
            text={` جاري تنفيذ العملية ${taskTitle(tasks[0].type)}`} 
            color="yellow"
            />
          )}
          {teacher && teacher.isPro !== false && !tasks.length && <Outlet />}

          {teacher?.isPro === false && <BuyMessage />}
        </div>

        <div></div>
      </div>
      <nav className="max-w-xs hidden md:block w-full bg-slate-50 shadow-md">
        <div className="pr-4 h-16 w-full bg-indigo-400 flex items-center justify-end">
          {loading && <Loader className="animate-spin" />}
          <span className="font-arabic text-2xl  text-center">نور</span>
        </div>

        <Menu items={tabs} selected={tab} />
      </nav>
    </div>
  );
};

export default Home;
