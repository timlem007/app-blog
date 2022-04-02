import React from 'react';
import { Link } from 'react-router-dom';
import './Sign-in.scss';

function SignIn() {
  return (
    <form className="sign-in__block">
      <p className="sign-in__block__header">Sing In</p>
      <label className="sign-in__block__form">
        Email address
        <input type="text" className="form" placeholder="Email address" />
      </label>
      <label className="sign-in__block__form">
        Password
        <input type="text" className="form" placeholder="Password" />
      </label>
      <button className="sign-in__block__button" type="button">Login</button>
      <p className="sign-in__block__footer">
        Don’t have an account?&nbsp;
        <Link to="/sign-up">Sign Up.</Link>
      </p>
    </form>
  );
}

export default SignIn;
