import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { Route, Routes } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import {Cart} from "../src/pages/Cart/Cart"
import {FormSubmit} from "../src/pages/FormSubmit/FormSubmit"

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
          path="/:idsrv/:type"
          element={<Header />}
        />
        <Route
          path="/:idsrv/:type/:value/cart"
          element={<Cart />}></Route>
                  <Route
          path="/:idsrv/cart"
          element={<Cart />}></Route>
          <Route path="/:idsrv/submit" element={<FormSubmit />} />
      </Routes>
    </Provider>
  );
};
