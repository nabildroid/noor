

import React from "react";


interface NotiProps {
    text:string;
}
 
const Noti: React.FC<NotiProps> = ({text}) => {
    return <div className="my-4 flex flex-row-reverse items-center bg-red-100 ">
    <div className="h-8 ml-4 w-1 bg-red-300"></div>
    <p className="flex-1 -mb-1 font-arabic text-red-800 text-right">
        {text}
    </p>
  </div>
}
 
export default Noti;