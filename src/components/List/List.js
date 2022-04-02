import React, { useState } from 'react';
import { Pagination } from 'antd';
import 'antd/dist/antd.min.css';
import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
import { getAticles } from '../../redux/actions';
import ListPost from '../List-post';
import './List.scss';

function List() {
  const [paginationCurrent, setPaginationCurrent] = useState(1);
  console.log(paginationCurrent);
  const { loading, articlesList, articlesCount } = useSelector((state) => state);
  const dispatch = useDispatch();
  let postId = 0;
  console.log(loading, articlesList, articlesCount, Object.keys({}).length);

  return (
    <>
      <ul className="list">
        {loading ? articlesList : articlesList.map((el) => {
          postId += 1;
          return <ListPost key={postId} data={el} />;
        })}
      </ul>
      <Pagination
        defaultPageSize={5}
        defaultCurrent="1"
        current={paginationCurrent}
        total={articlesCount}
        onChange={(page, pageSize) => {
          console.log(page);
          setPaginationCurrent(+page);
          return dispatch(getAticles((page * pageSize) - pageSize));
        }}
      />
    </>
  );
}

export default List;
