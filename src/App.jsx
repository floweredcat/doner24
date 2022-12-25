import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { Route, Routes } from "react-router-dom";
import { SliderContainer } from "./containers/sliderContainer/SliderContainer";
import { Header } from "./Components/Header/Header";

export const App = () => {
  return (
    <Provider store={store}>
        <Routes>
          <Route
            index
            element={<Header/>}></Route>
          <Route
            path="/cart"
            element={<SliderContainer />}></Route>
        </Routes>
    </Provider>
  );
};
