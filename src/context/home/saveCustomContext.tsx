import React, { createContext, useContext, useEffect } from "react";
import { RatingKinder } from "../../types/home_types";
import { HomeContext } from "../homeContext";


export interface ISaveCustomContext {
  save(rate: RatingKinder): Promise<void>;
}

export const SaveCustomContext = createContext<ISaveCustomContext>(null!);

const SaveCustomProvider: React.FC = ({ children }) => {
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
    <SaveCustomContext.Provider value={{ save }}>
      {children}
    </SaveCustomContext.Provider>
  );
};

export default SaveCustomProvider;
