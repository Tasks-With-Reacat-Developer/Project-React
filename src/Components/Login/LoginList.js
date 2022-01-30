import React from 'react';
import {  useSelector } from "react-redux";

const LoginList = ({submitHandler, Link, username, password}) => {
  const {error} = useSelector((state) => state.auth)

  return (
    <form onSubmit={submitHandler}>
      {error && <p style={{color: 'red', textAlign: 'center', fontWeight: 'bold'}}>{error.message}</p>}
      <input type="text" ref={username} placeholder="UserName" required />
      <input type="password"  ref={password} placeholder="Your Password " required />
      <button type="submit">Login</button>
    <p>
    Don't have an Account?<Link to="/Signup"> Signup! </Link>
    </p>
  </form>

  );
};

export default LoginList;
