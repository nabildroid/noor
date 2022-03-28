import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Teacher } from "../models/home_model";
import DB from "../repository/db";

type params = {
  user?: User;
};

const useFetchTeacher = ({ user }: params) => {
  const [teacher, setTeacher] = useState<Teacher>();
  useEffect(() => {
    if (user) {
      // const savedData = localStorage.getItem(user.uid);
      // if (savedData) {
      //   try {
      //     const saved = JSON.parse(savedData) as Teacher;
      //     setTeacher(saved);
      //     return;
      //   } catch (e) {}
      // }

      // todo remove the subscription 
      // CHECK should i get the teacher doc everytime!
      DB.instance.subscribeToTeacher(user.uid, (data)=>{
        setTeacher(data);
        console.log(data);
      });
    }
  }, [user]);

  return teacher;
};

export default useFetchTeacher;
