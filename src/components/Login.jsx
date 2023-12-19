import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/user/userSlice';

const Login = () => {
  const email = useRef();
  const password = useRef();
  const dispath = useDispatch();

  const { wrongData } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispath(login({
      user: {
        email: email.current.value,
        password: password.current.value,
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {wrongData}
      <h2>Login</h2>
      <input type="email" name="email" placeholder="email@example.com" ref={email} />
      <input type="password" name="password" placeholder="your password" ref={password} />
      <button type="submit">Log In</button>
    </form>
  );
};

export default Login;
