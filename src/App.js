import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { Route, Routes } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import {Cart} from "../src/pages/Cart/Cart"
import {FormSubmit} from "../src/pages/FormSubmit/FormSubmit"
import { Main } from "./pages/Main/Main";

export const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route
          path="/:idsrv/:type/:value/folder/:pid"
          element={<Header />}
        />  
        <Route
          path="/:idsrv/folder/:pid"
          element={<Header />}
        />
        <Route
          path="/:idsrv/:type/folder/:pid"
          element={<Header />}
        />
        <Route
          path="/:idsrv/:type/:value/cart"
          element={<Cart />}></Route>
        <Route
          path="/:idsrv/cart"
          element={<Cart />}></Route>
        <Route path="/:idsrv/submit" element={<FormSubmit />} />
        <Route path="/:idsrv/:type/:value" element={<Main />} />
        <Route path="/:idsrv" element={<Main />} />        
      </Routes>
    </Provider>
  );
};
