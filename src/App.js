import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { loadUserData } from "./Store/authSlice";
import { getCategories } from './Store/CategorieSlice';

import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Products from "./Components/Products/Products";
import AddProduct from "./Components/Add-Product/AddProduct";
import Categories from "./Components/Categories/Categories";


const App = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserData());
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Fragment>
        <BrowserRouter>
          <Header />
          <Routes>
            {isLoggedIn && <Route path="/Products" element={<Products />} />}
            {!isLoggedIn && <Route path="/Login" element={<Login />} />}
            {!isLoggedIn && <Route path="/Signup" element={<Signup />} />}
            <Route
              path="*"
              element={
                isLoggedIn ? (
                  <Navigate to="/Products" />
                  ) : (
                    <Navigate to="/Login" />
                    )
                  }
            />
            <Route path="/AddProduct" element={<AddProduct />} />
            <Route path="/Categories" element={<Categories />} />
          </Routes>
        </BrowserRouter>
    </Fragment>
  );
};

export default App;
