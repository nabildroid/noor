import { RadioGroup } from "@headlessui/react";
import React, { useState } from "react";

type Option = {
  id: string;
  value: string;
};
interface CheckBoxsProps {
  options: Option[];
  onSelect(id: string): void;
  className?: string;
}

const CheckBoxs: React.FC<CheckBoxsProps> = ({ options, className }) => {
  let [selected, setSelected] = useState<Option>();

  return (
    <RadioGroup className={className} value={selected} onChange={setSelected}>
      {options.map((o) => (
        <RadioGroup.Option key={o.id} value={o.value}>
          {({ checked }) => (
            <div
              className={`px-2 cursor-pointer  py-1 rounded-md text-sm shadow-sm border border-slate-500 
                  ${
                    checked
                      ? "bg-indigo-500 text-indigo-50 border-indigo-300"
                      : ""
                  } `}
            >
              {o.value}
            </div>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
};

export default CheckBoxs;
