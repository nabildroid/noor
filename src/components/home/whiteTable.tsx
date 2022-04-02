import React from "react";

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
];

interface Props {
    head:{
        
    }
}

const WhiteTable: React.FC<Props> = () => {
  return (
    <div className="mt-8 flex flex-col overflow-hidden">
      <div className="-my-2  overflow-x-auto ">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <table style={{direction:"rtl"}} className="min-w-full  text-right divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-right text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="py-3.5 px-3 text-right text-sm font-semibold text-gray-900"
                >
                  Title
                </th>
                
                <th
                  scope="col"
                  className="py-3.5 px-3 text-right text-sm font-semibold text-gray-900"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {people.map((person) => (
                <tr key={person.email}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                    {person.name}
                  </td>
                  <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                    {person.title}
                  </td>
                  
                  <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                    {person.role}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 md:pr-0">
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit<span className="sr-only">, {person.name}</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WhiteTable;
