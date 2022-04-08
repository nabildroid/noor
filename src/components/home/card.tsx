import React from "react";
import { Loader } from "react-feather";

interface CardProps {
  loading: boolean;
}

const Card: React.FC<CardProps> = ({ children, loading }) => {
  return (
    <div style={{minHeight:"30%"}} className="flex-1 relative flex flex-col w-full h-full px-4 bg-white rounded-md shadow  py-4">
      {loading && (
        <div className="absolute inset-0 bg-indigo-200/50 flex items-center justify-center">
          <Loader className="text-indigo-600 w-12 h-12 animate-spin" />
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
