import React, { useLayoutEffect, useRef, useState } from "react";

type Item = {
  name: string;
  title: string;
  email: string;
  role: string;
};

const people: Item[] = [
  {
    name: "اولة مةوسط",
    title: "2",
    email: "العلوم",
    role: "فارغ",
  },
  // More people...
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
}

const CheckTable: React.FC<Props> = () => {
  const checkbox = useRef<HTMLInputElement>();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState<Item[]>([]);

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedPeople.length > 0 && selectedPeople.length < people.length;
    setChecked(selectedPeople.length === people.length);
    setIndeterminate(isIndeterminate);
    checkbox.current!.indeterminate = isIndeterminate;
  }, [selectedPeople]);

  function toggleAll() {
    setSelectedPeople(checked || indeterminate ? [] : people);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  return (
    <div className=" sm:px-6 lg:px-8 font-arabic">
    
      <div className="mt-8 flex flex-col  w-full">
        <div className="-my-2 max-w-xs sm:max-w-none  overflow-x-auto sm:-mx-6 sm:px-2 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle ">
            <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              
              <table style={{direction:"rtl"}} className="min-w-full table-fixed divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="relative px-1 sm:w-16 sm:px-8"
                    >
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                        ref={checkbox as any}
                        checked={checked}
                        onChange={toggleAll}
                      />
                    </th>
                    <th
                      scope="col"
                      className="sm:min-w-[12rem] py-3.5 pr-3 text-right text-sm font-semibold text-gray-900"
                    >
                      الصف
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                    >
                      الفصل
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                    >
                      المادة
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                    >
                      النوع
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                    >
                    </th>
                    
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {people.map((person) => (
                    <tr
                      key={person.email}
                      className={
                        selectedPeople.includes(person)
                          ? "bg-gray-50"
                          : undefined
                      }
                    >
                      <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                        {selectedPeople.includes(person) && (
                          <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                        )}
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                          value={person.email}
                          checked={selectedPeople.includes(person)}
                          onChange={(e) =>
                            setSelectedPeople(
                              e.target.checked
                                ? [...selectedPeople, person]
                                : selectedPeople.filter((p) => p !== person)
                            )
                          }
                        />
                      </td>
                      <td
                        className={classNames(
                          "whitespace-nowrap py-4 pr-3 text-sm font-medium",
                          selectedPeople.includes(person)
                            ? "text-indigo-600"
                            : "text-gray-900"
                        )}
                      >
                        {person.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.role}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          ةحميل<span className="sr-only">, {person.name}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckTable;
