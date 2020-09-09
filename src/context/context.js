import { createContext, useContext } from "react";

const auth = {
  isDataLoaded: false,
  data: [],
  team: null,
  setIsDataLoaded: () => {},
  setData: () => {},
  setTeam: () => {},
};
export const DataContext = createContext(auth);
export const useData = () => {
  return useContext(DataContext);
};
