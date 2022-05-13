import React, { useEffect, useState } from 'react';
import { Tag } from 'antd';
import Icon, { HeartOutlined } from '@ant-design/icons';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import 'antd/dist/antd.min.css';
import format from 'date-fns/format';
import { getAticlesSlug, likes } from '../../redux/actions';
import './Post.scss';
import isDeleteIcon from './isDeleteIcon.svg';

function HeartSvg() {
  return (
    <svg style={{ color: '#FF0707' }} width="14px" height="14px" fill="currentColor" viewBox="0 0 1024 1024">
      <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
    </svg>
  );
}
function HeartIcon(props) {
  return <Icon component={HeartSvg} {...props} />;
}

function Post() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isDelete, setIsDelete] = useState(false);
  const { page, authenticationInfo, isAuthentication } = useSelector((state) => state);
  useEffect(() => dispatch(getAticlesSlug(slug)), [slug]);
  const data = page;

  const fetchs = async (url, method, to = null) => {
    try {
      console.log('fewfew');
      const res = await fetch(`https://kata.academy:8021/api/articles/${url}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${document.cookie.split(' ')[0].slice(5)}`,
        },
      });
      console.log(res, !res.ok);
      if (!res.ok) {
        throw new Error(`Could not fetch articles , received ${res.status}`);
      }
      const result = await res.json();
      console.log(result, result.article.favoritesCount, result.article.favorited);

      if (to) navigate(to);
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  };
  // fetchs(slug, 'DELETE', '/')
  // fetchs(`${slug}/favorite`, 'POST')
  let tagId = 10000;
  const createDate = Object.keys(page).length ? format(new Date(data.createdAt), 'MMMM d, yyyy') : '';

  return (Object.keys(page).length
    ? (
      <li className="post">
        <section className="post__header">
          <div className="post__header__body">
            <div className="post__body__header">
              <Link
                className="post__body__header__title"
                to={`/articles/${data.slug}`}
              >
                {data.title}
              </Link>
              <div className="post__body__header__likes">
                {'' || data?.favorited ? (
                  <HeartIcon onClick={() => (isAuthentication === 'null' ? null : dispatch(likes(slug, 'DELETE')))} />
                )
                  : <HeartOutlined onClick={() => (isAuthentication === 'null' ? null : dispatch(likes(slug, 'POST')))} />}
                <p>{'' || data.favoritesCount}</p>
              </div>
            </div>
            <div
              className="post__body__tags"
            >
              {data.tagList.map((element) => {
                tagId += 1;
                return <Tag key={tagId}>{element}</Tag>;
              })}
            </div>
            <p className="post__body__description">{data.description}</p>
          </div>
          <div className="post-info__box">
            <div className="post-info">
              <section className="post__info__text">
                <p className="post__info__text__user-name">{data?.author?.username}</p>
                <p className="post__info__text__created-at">{createDate}</p>
              </section>
              <img
                alt="icon"
                className="post__info__image"
                src={data.author.image}
              />
            </div>
            {authenticationInfo?.user?.username !== data?.author?.username ? null : (
              <div className="post__button">
                <button
                  type="button"
                  className="post__button__delete"
                  onClick={() => setIsDelete(true)}
                >
                  Delete
                </button>
                {isDelete
                  ? (
                    <div className="post__is-delete__block">
                      <div className="post__is-delete__text__block">
                        <img src={isDeleteIcon} alt="isDeleteIcon" />
                        <p className="post__is-delete__text">Are you sure to delete this article?</p>
                      </div>
                      <div className="post__is-delete__button__block">
                        <button
                          type="button"
                          className="post__is-delete__no"
                          onClick={() => setIsDelete(false)}
                        >
                          No
                        </button>
                        <button
                          type="button"
                          className="post__is-delete__yes"
                          onClick={() => fetchs(slug, 'DELETE', '/')}
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="post__button__edit"
                      onClick={() => navigate(`/articles/${slug}/edit`)}
                    >
                      Edit
                    </button>
                  )}
              </div>
            )}
          </div>
        </section>
        <p className="post__footer">{data.body}</p>
      </li>
    ) : null
  );
}

export default Post;
