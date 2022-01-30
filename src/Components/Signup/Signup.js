import React, { useEffect, useState, useRef } from "react";
import style from "./Signup.module.css";
import { useDispatch } from "react-redux";
import { userSignUp } from "../../Store/authSlice";
import { useNavigate } from "react-router-dom";
import SignupList from "./SignupList";

const Signup = () => {
  const [error, setError] = useState();
  const name = useRef(null);
  const username = useRef(null);
  const password = useRef(null);
  const role = useRef(null);
  const avatar = useRef('./Avatar.png');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Change Title Page
  useEffect(() => {
    document.title = `Product | Signup`;
  }, []);

  // Sumbit Register
  const sumbitHandler = (e) => {
    e.preventDefault();
    const NewUser = {
      name: name.current.value,
      username: username.current.value,
      password: password.current.value,
      role: role.current.value,
      avatar: avatar.current,
    }
    dispatch(userSignUp(NewUser))
      .unwrap()
      .then((res) => {
        return navigate("/login");
      })
      .catch((error) => {
        return setError(error.message);
      });
      name.current.value = null;
      username.current.value = null;
      password.current.value = null;
      role.current.value = null;
  };

  return (
    <div className={style.Signup}>
      <SignupList sumbitHandler={sumbitHandler} error={error} name={name} password={password} 
      role={role} username={username}
      />
    </div>
  );
};

export default Signup;
