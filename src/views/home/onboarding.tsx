import React, { useContext } from "react";
import { Loader, Save } from "react-feather";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/appContext";
import { HomeContext } from "../../context/homeContext";

interface OnboardingProps {}

const Onboarding: React.FC<OnboardingProps> = () => {
  const { user } = useContext(AppContext);
  const { teacher } = useContext(HomeContext);

  if (!(user?.displayName) && !teacher) {
    return (
      <div className="w-full  h-72 flex justify-center items-center">
        <div className="max-w-sm w-full p-3 pr-8 flex flex-row-reverse items-center font-arabic bg-indigo-100 rounded-lg">
          <Loader className="animate-spin w-6 h-6 text-indigo-400" />
          <span className="text-indigo-500 mr-8">جاري انشاء الحساب </span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid  grid-cols-2 md:grid-cols-3 gap-4 max-w-xl w-full mx-auto">
      {new Array(9).fill("").map((_, i) => (
        <Link
          key={i}
          to="/saveall"
          className="outline-none p-4 hover:border-2 hover:-m-1 hover:shadow-indigo-200/50  hover:shadow-lg   hover:border-indigo-500
          focus:border-2 focus:-m-1 focus:shadow-indigo-200/50  focus:shadow-lg   focus:border-indigo-500
          
          flex flex-col justify-center items-center rounded-md border bg-white border-indigo-50  shadow"
        >
          <Save className="text-indigo-200" />
          <span className="mt-4 text-indigo-600 font-arabic">
            مرحبا بالعالم
          </span>
          <span className="m-1 text-indigo-400 text-sm font-arabic">
            مرحبا بالعالم
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Onboarding;
