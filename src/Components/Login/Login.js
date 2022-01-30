import React, { useEffect, useRef } from "react";
import style from "./Login.module.css";
import { Link , useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogIn } from "../../Store/authSlice";
import LoginList from './LoginList';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useRef();
  const password = useRef();

  // Change Title Page
  useEffect(() => {
    document.title = `Product | Login`;
}, []);

  // Sumbit Hangler Login
  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      username: username.current.value,
      password: password.current.value,
    };
    dispatch(userLogIn(data))
      .unwrap()
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res));
        navigate("/Products");
      })
      username.current.value = null;
      password.current.value= null;
  };

  return (
    <div className={style.Login}>
      <LoginList submitHandler={submitHandler} Link={Link} username={username} password={password}/>
    </div>
  );
};

export default Login;
