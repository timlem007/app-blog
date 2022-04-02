import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Header.scss';

function Header() {
  return (
    <>
      <nav className="header">
        <Link className="header__name" to="/">Realworld Blog</Link>
        <section className="authorization">
          <Link className="header__sign_in" to="/sign-in">Sign In</Link>
          <Link className="header__sign_up" to="/sign-up">Sign Up</Link>
        </section>
      </nav>
      <Outlet />
    </>
  );
}

export default Header;
