import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthenticationUserInfo, logOut } from '../../redux/actions';
import './Header.scss';

function Header() {
  const { authenticationInfo, isAuthentication } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => dispatch(getAuthenticationUserInfo()), []);

  return (
    <>
      <nav className="header">
        <Link className="header__name" to="/">Realworld Blog</Link>
        <section className="authorization">
          {isAuthentication === 'null'
            ? (
              <>
                <Link className="header__button header__sign_in" to="/sign-in">
                  <p>Sign In</p>
                </Link>
                <Link className="header__button header__sign_up" to="/sign-up">
                  <p>Sign Up</p>
                </Link>
              </>
            )
            : (
              <>
                <Link className="header__button header__create_article" to="/new-article">
                  <p>Create article</p>
                </Link>
                <Link className="header__profile" to="/profile">
                  <p className="header__profile__username">{authenticationInfo?.user?.username}</p>
                  {authenticationInfo?.user?.image ? <img className="list__post__info__image" src={authenticationInfo.user.image} alt="profile__icon" /> : null}
                </Link>
                <button
                  type="button"
                  className="header__button header__log_out"
                  onClick={() => {
                    document.cookie = 'user=null';
                    dispatch(logOut());
                  }}
                >
                  <p>Log Out</p>
                </button>
              </>
            )}
        </section>
      </nav>
      <Outlet />
    </>
  );
}

export default Header;
