import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postNewUsers } from '../../redux/actions';
import './Create-account.scss';

function CreateAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthentication } = useSelector((state) => state);
  const {
    register, watch, formState: { errors }, handleSubmit,
  } = useForm({ mode: 'onChange' });
  // console.log(username, email, password);
  console.log(isAuthentication);
  const onSubmit = (data) => {
    console.log(data);
    if (isAuthentication === 'null') {
      console.log(data);
      dispatch(postNewUsers(data.username, data.email, data.password));
      navigate('/sign-in');
    }
  };
/* eslint-disable */
  const emailValid = /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i;

  const myInput = (
    placeholder,
    registerObj = { minLength: null, maxLength: null, pattern: null, validate: null },
    name,
    text = placeholder,
  ) => (
    <label className='sign-up__block__form'>
      {text}
      <input
        type='text'
        className='form'
        placeholder={placeholder}
        {...register(`${name}`, {
          required: true,
          minLength: registerObj.minLength,
          maxLength: registerObj.maxLength,
          pattern: registerObj.pattern,
          validate: registerObj.validate,
        })}
      />
        {errors[name]?.type === 'required' && <p className="input-errors">Required</p> }
        {errors[name]?.type === 'minLength' && <p className="input-errors">Min length {registerObj.minLength}</p> }
        {errors[name]?.type === 'maxLength' && <p className="input-errors">Max length {registerObj.maxLength}</p> }
        {errors[name]?.type === 'pattern' && <p className="input-errors">Incorrect Email</p> }
        {errors[name]?.type === 'validate' && <p className="input-errors">Passwords must match</p> }
    </label>
  );

  return (
    <form className="sign-up__block" onSubmit={handleSubmit(onSubmit)}>
      <p className="sign-up__block__header">Create new account</p>
      {myInput('Username', { minLength: 3, maxLength: 20 }, 'username')}
      {myInput('Email address', { pattern: emailValid }, 'email')}
      {myInput('Password', { minLength: 6, maxLength: 40 }, 'password')}
      {myInput('Password', { validate: (value) => value === watch('password') }, 'Repeat Password', 'Repeat Password')}
      {/* 'Passwords must match' */}
      <label className="sign-up__block__checkbox">
      <input type='checkbox' className='checkbox'
      {...register('checkbox', { required: true })}
      />
      <p>I agree to the processing of my personal information</p>
      {errors.checkbox && <p className="input-errors">Required</p> }
      </label>
      <button className="sign-up__block__button" type="submit">
        Create
      </button>
      <p className="sign-up__block__footer">
        Already have an account?&nbsp;
        <Link to="/sign-in">Sign In.</Link>
      </p>
    </form>
  );
}

export default CreateAccount;
