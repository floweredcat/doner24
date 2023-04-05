import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { Route, Routes } from "react-router-dom";
import { SliderContainer } from "./containers/sliderContainer/SliderContainer";
import { Header } from "./Components/Header/Header";
// import { Redirect } from "./pages/Redirect";

export const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        {/* <Route
          path="/"
          element={<Redirect />}/> */}
        <Route
          path="/:idsrv/:type/:value"
          element={<Header />}
        />
          <Route
          path="/:idsrv"
          element={<Header />}
        />
        <Route
          path="/cart"
          element={<SliderContainer />}></Route>
      </Routes>
    </Provider>
  );
};
