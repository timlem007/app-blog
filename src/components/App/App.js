import React, { useEffect } from 'react';
import { Spin } from 'antd';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAticles } from '../../redux/actions';
import './App.scss';

// import Info from '../../Service';
import Header from '../Header';
import List from '../List';
import SignIn from '../Sign-in';
import SignUp from '../Sign-up';
import Post from '../Post';
// import ListPost from '../List-post';

function App() {
  const { loading } = useSelector((state) => state);
  const dispatch = useDispatch();
  // const [listInfo, setListInfo] = useState({});
  // const [loading, setLoading] = useState(true);
  // const data = new Info();
  // const getArticlesList = (number) => {
  //   setLoading(true);
  //   return data.getAticles(number).then((res) => {
  //     setListInfo(res);
  //     // console.log(res);
  //     setLoading(false);
  //   });
  // };

  // useEffect(() => getArticlesList(), []);
  useEffect(() => dispatch(getAticles()), []);

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route
          index
          element={(loading
            ? <Spin className="card-spinner" tip="Loading..." size="large" />
            : <List />
        )}
        />
        <Route
          path="sign-in"
          element={<SignIn />}
        />
        <Route
          path="sign-up"
          element={<SignUp />}
        />
        <Route
          path="articles"
          element={(loading
            ? <Spin className="card-spinner" tip="Loading..." size="large" />
            : <List />
        )}
        />
        <Route
          path="articles/:slug"
          element={(loading
            ? <Spin className="card-spinner" tip="Loading..." size="large" />
            : <Post />
        )}
        />
      </Route>
    </Routes>
  );
}

export default App;
