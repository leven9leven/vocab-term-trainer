import React, { useState } from "react";
import defaultData from "./data/defaultData.json";

export const DataContext = React.createContext();

const Store = ({ children }) => {
  const [data, setData] = useState(defaultData);

  return <DataContext.Provider value={[data, setData]}>{children}</DataContext.Provider>;
};

export default Store;
