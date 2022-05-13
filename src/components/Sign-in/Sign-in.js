import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { singIn } from '../../redux/actions';
import './Sign-in.scss';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <form className="sign-in__block">
      <p className="sign-in__block__header">Sing In</p>
      <label className="sign-in__block__form">
        Email address
        <input
          type="text"
          className="form"
          placeholder="Email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label className="sign-in__block__form">
        Password
        <input
          type="text"
          className="form"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <button
        className="sign-in__block__button"
        type="submit"
        onClick={() => {
          console.log('3');
          dispatch(singIn(email, password));
          navigate('/');
        }}
      >
        Login
      </button>
      <p className="sign-in__block__footer">
        Don’t have an account?&nbsp;
        <Link to="/sign-up">Sign Up.</Link>
      </p>
    </form>
  );
}

export default SignIn;
