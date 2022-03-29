import React, { createContext, useContext, useEffect } from "react";
import { RatingKinder } from "../../types/home_types";
import { HomeContext } from "../homeContext";



export interface ISaveAllContext {
  save(rate: RatingKinder): Promise<void>;
}

export const SaveAllContext = createContext<ISaveAllContext>(null!);

const SaveAllProvider: React.FC = ({ children }) => {
  const { tab, currentRole } = useContext(HomeContext);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    // const { form } = await Repository.instance.navigateTo({
    //   account: currentRole!,
    //   nav1: "المهارات",
    //   nav2: "إدخال نتائج المهارة على مستوى طفل ووحدة",
    // });
  }

  async function save(rate: RatingKinder) {}

  return (
    <SaveAllContext.Provider value={{ save }}>
      {children}
    </SaveAllContext.Provider>
  );
};

export default SaveAllProvider;
