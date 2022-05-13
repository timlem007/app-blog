import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';

// import Info from '../../Service';
import Header from '../Header';
import List from '../List';
import SignIn from '../Sign-in';
import CreateAccount from '../Create-account';
import EditProfile from '../Edit-profile';
import Post from '../Post';
import CreatArticle from '../Create-article';
import EditArticle from '../Edit-article';
// import ListPost from '../List-post';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route
          index
          element={<List />}
        />
        <Route
          path="sign-in"
          element={<SignIn />}
        />
        <Route
          path="sign-up"
          element={<CreateAccount />}
        />
        <Route
          path="articles"
          element={<List />}
        />
        <Route
          path="articles/:slug"
          element={<Post />}
        />
        <Route
          path="profile"
          element={<EditProfile />}
        />
        <Route
          path="new-article"
          element={<CreatArticle />}
        />
        <Route
          path="articles/:slug/edit"
          element={<EditArticle />}
        />
      </Route>
    </Routes>
  );
}

export default React.memo(App);
