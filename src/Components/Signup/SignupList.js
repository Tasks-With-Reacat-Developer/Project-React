import React from 'react';

const SignupList = ({sumbitHandler, error, name, password,username,role}) => {
  return (
    <form onSubmit={sumbitHandler}>
      <input type="text" ref={name}  placeholder="Your Name.." required />
      <input type="password" ref={password} name="password" id="password" required placeholder="Your Password.." />
      <input type="text" ref={username}  required placeholder="UserName.." />
      <select ref={role}  required>
        <option value="">Select Your Role</option>
        <option value="manager">manager</option>
        <option value="editor">editor</option>
      </select>
    <button type="submit">Signup</button>
  {error && <p style={{color: 'red', fontSize: '20px', fontWeight: 'bold'}}>{error}</p>}
  </form>
  )
  ;
};

export default SignupList;
