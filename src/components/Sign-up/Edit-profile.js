import React from 'react';
import { Link } from 'react-router-dom';
import './Edit-profile.scss';

function EditProfile() {
  return (
    <form className="sign-up__block">
      <p className="sign-up__block__header">Create new account</p>
      <label className="sign-up__block__form">
        Username
        <input type="text" className="form" placeholder="Username" />
      </label>
      <label className="sign-up__block__form">
        Email address
        <input type="text" className="form" placeholder="Email address" />
      </label>
      <label className="sign-up__block__form">
        Password
        <input type="text" className="form" placeholder="Password" />
      </label>
      <label className="sign-up__block__form">
        Repeat Password
        <input type="text" className="form" placeholder="Password" />
      </label>
      <label className="sign-up__block__checkbox">
        <input className="checkbox" type="checkbox" />
        <p>I agree to the processing of my personal information</p>
      </label>
      <button className="sign-up__block__button" type="button">Create</button>
      <p className="sign-up__block__footer">
        Already have an account?&nbsp;
        <Link to="/sign-in">Sign In.</Link>
      </p>
    </form>
  );
}

export default EditProfile;
