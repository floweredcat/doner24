import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { Route, Routes } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import { CartSlider } from "./pages/CartSlider/CartSlider";

export const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route
          path="/:idsrv/:type/:value"
          element={<Header />}
        />
          <Route
          path="/:idsrv"
          element={<Header />}
        />
        <Route
          path="/:idsrv/:type/:value/cart"
          element={<CartSlider />}></Route>
                  <Route
          path="/:idsrv/cart"
          element={<CartSlider />}></Route>
      </Routes>
    </Provider>
  );
};
