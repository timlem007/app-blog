import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/actions';
// import './Edit-profile.scss';
import '../Create-account/Create-account.scss';

function EditProfile() {
  const dispatch = useDispatch();
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const imageURL = useRef();
  const {
    // register,
    // reset,
    formState: {
      // errors,
      isValid,
    },
    // handleSubmit,
  } = useForm({ mode: 'onChange' });
  const formSubmit = (event) => {
    event.preventDefault();
    // console.log(name.current, email.current, password.current, imageURL.current);
    dispatch(updateUser(name.current, email.current, password.current, imageURL.current));
  };

  return (
    <form className="sign-up__block" onSubmit={formSubmit}>
      <p className="sign-up__block__header">Edit Profile</p>
      <label className="sign-up__block__form">
        <p>Username</p>
        <input
          type="text"
          className="form"
          // value={name}
          onChange={(event) => { name.current = event.target.value; }}
          placeholder="Username"
        />
      </label>
      <label className="sign-up__block__form">
        <p>Email address</p>
        <input
          type="text"
          className="form"
          // value={email}
          onChange={(event) => { email.current = event.target.value; }}
          placeholder="Email address"
        />
      </label>
      <label className="sign-up__block__form">
        <p>Password</p>
        <input
          type="text"
          className="form"
          // value={password}
          onChange={(event) => { password.current = event.target.value; }}
          placeholder="New password"
        />
      </label>
      <label className="sign-up__block__form">
        <p>Avatar image (url)</p>
        <input
          type="text"
          className="form"
          // value={imageURL}
          onChange={(event) => { imageURL.current = event.target.value; }}
          placeholder="Avatar image"
        />
      </label>
      <button disabled={!isValid} className="sign-up__block__button" type="submit">Save</button>
    </form>
  );
}

export default EditProfile;
