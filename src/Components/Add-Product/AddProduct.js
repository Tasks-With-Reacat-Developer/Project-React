import React, { Fragment, useRef, useEffect } from "react";
import { insetProduct } from "../../Store/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Add-Product.css";

const AddProduct = () => {
  const Dispatch = useDispatch();
  const { error } = useSelector((state) => state.products);
  const { Category } = useSelector((state) => state.categories);

  useEffect(() => {
    document.title = `Products | Add Product`;
  }, []);

  const name = useRef(null);
  const price = useRef(null);
  // const Desc = useRef(null);
  const image = useRef(null);
  const category = useRef(null);

  const HanglerSubmit = (e) => {
    e.preventDefault();
    const New = {
      category: {
        _id: Math.random() * 60000,
        name: category.current.value,
      },
      name: name.current.value,
      price: Number(price.current.value),
      // Desc: Desc.current.value,
      image: image.current.value
    };
    Dispatch(insetProduct(New));
    name.current.value = null;
    price.current.value = null;
    image.current.value = null;
    category.current.value = null;
    // Desc.current.value = null;
  };

  return (
    <Fragment>
      <div className="Add-Product">
        <h2>New Products</h2>
        <form onSubmit={HanglerSubmit}>
          <input type="text" ref={name} placeholder="Name" required />
          <input type="number" ref={price} placeholder="Price" required />
          {/* <textarea required ref={Desc} placeholder="Desc"></textarea> */}
          <select ref={category}>
            {Category.length &&
              Category.map((el) => (
                <option value={el.name} key={el._id}>
                  {el.name}
                </option>
              ))}
          </select>
          <input type="file" ref={image} placeholder="image" required/>
          <input type="submit" value="Add Product" />
        </form>
        {error && (
          <p style={{ color: "red", fontSize: "20px", fontWeight: "bold" }}>
            {error}
          </p>
        )}
      </div>
    </Fragment>
  );
};

export default AddProduct;
