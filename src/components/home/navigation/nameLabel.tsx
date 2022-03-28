import React from "react";

type params = {
  name?: string;
};

const NameLabel: React.FC<params> = ({ name }) => {
  return (
    <div
      className={`px-2 py-1 rounded-xl text-zinc-800 border-2 border-indigo-200 ${
        !name ? "animate-pulse" : ""
      } `}
    >
      {name}
    </div>
  );
};

export default NameLabel;
