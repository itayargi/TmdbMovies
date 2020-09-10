import React, { createContext, useState } from "react";

export const DataStorage = createContext();

export const MyProvider = (props) => {
  const [favoriteList, setFavoriteList] = useState([]);

  return (
    <DataStorage.Provider value={[favoriteList, setFavoriteList]}>
      {props.children}
    </DataStorage.Provider>
  );
};
