import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts,deleteProducts } from "../../Store/productsSlice";
import ProductList from "./ProductList";
import './Products.css';

const Products = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);
  
  useEffect(() => {
    document.title = `Products | HomePage`;
    dispatch(getProducts());
  }, [dispatch]);


  return (
    <div className="Products">
      <div className="container">
        <div className='Product'>
        <ProductList products={products} deleteProducts={deleteProducts}  dispatch={dispatch}/>
        {isLoading && <h2>Loading...</h2>}
        </div>
        </div>
    </div>
  );
};

export default Products;
