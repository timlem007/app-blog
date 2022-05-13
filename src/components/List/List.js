import React, { useState, useEffect } from 'react';
import { Spin, Pagination } from 'antd';
import 'antd/dist/antd.min.css';
import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
import { getAticles } from '../../redux/actions';
import ListPost from '../List-post';
import './List.scss';

function List() {
  const [paginationCurrent, setPaginationCurrent] = useState(1);
  const { loading, articlesList, articlesCount } = useSelector((state) => state);
  const dispatch = useDispatch();
  let postId = 0;

  useEffect(() => dispatch(getAticles((paginationCurrent * 5) - 5)), [dispatch, paginationCurrent]);

  return loading
    ? <Spin className="card-spinner" tip="Loading..." size="large" /> : (
      <>
        <ul className="list">
          {loading ? articlesList : articlesList.map((el) => {
            postId += 1;
            return <ListPost key={postId} data={el} />;
          })}
        </ul>
        <Pagination
          defaultPageSize={5}
          current={paginationCurrent}
          total={articlesCount}
          onChange={(page) => setPaginationCurrent(page)}
        />
      </>
    );
}

export default React.memo(List);
