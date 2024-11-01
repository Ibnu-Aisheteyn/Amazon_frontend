/* eslint-disable react/prop-types */
import React, { createContext, useReducer } from "react";
import { initialState } from "../../Utility/reducer.JSX";
import { reducer } from "../../Utility/reducer.JSX";
export const DataContext = createContext();
export const DataProvider = ({ children, reducer, initialState }) => {
  return (
    <DataContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </DataContext.Provider>
  );
};
