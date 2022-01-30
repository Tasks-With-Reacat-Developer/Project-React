import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { logOut } from "../../Store/authSlice";
import style from "./Header.module.css";

const Header = () => {
  const [show, setShow] = useState(false);
  const { userData, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  //Drop Menu
  const DropDown = () => {
    setShow(!show);
  };

  // Button Logout
  const logoutHandler = () => {
    dispatch(logOut());
    localStorage.removeItem("user");
    localStorage.removeItem("myToken");
    setShow(false);
    Navigate("/login");
  };

  return (
    <header>
      <div className="container">
        <nav>
          <h2>Online Product</h2>
          {!isLoggedIn ? (
            <ul className={style.List}>
              <li>
                <Link to="/Login">Login</Link>
              </li>
              <li>
                <Link to="/Signup">Signup</Link>
              </li>
            </ul>
          ) : (
            <div className={style.Logout}>
              <div className={style.imgs} onClick={DropDown}>
                <img src="Avatar.png" alt="Avatar" />
                <h3>{userData.user.username}</h3>
                <span>
                  {show ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
                </span>
              </div>

              <div className={`${style.info} ${show ? style.Drop : ""}`}>
                <ul>
                  <li><Link to='/Products'>Home</Link></li>
                  <li><Link to='/AddProduct'>Add Product</Link></li>
                  <li><Link to='/Categories'>Add Categories</Link></li>
                </ul>
                <button onClick={logoutHandler}>Logout</button>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
