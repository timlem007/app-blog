import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { updateUser } from '../../redux/actions';
import { useNavigate, useParams } from 'react-router-dom';
import { getAticlesSlug } from '../../redux/actions';
import './Edit-article.scss';

let tagId = 0;
function EditArticle() {
  const { page } = useSelector((state) => state);
  const [arrTags, setArrTags] = useState([]);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [body, setBody] = useState();
  const tags = useRef({});

  useEffect(() => (!page?.slug ? dispatch(getAticlesSlug(slug)) : null), [slug]);
  // const title = useRef(page.title);
  // const description = useRef(page.title);
  // const text = useRef(page.title);

  // console.log(Object.values(tags.current).join(', '), arrTags, page,
  // page.tagList, Object.keys(page));
  // console.log(title, description, body, tags.current);

  const formSubmit = async (event) => {
    event.preventDefault();
    console.log(title, description, body, tags.current);
    try {
      const res = await fetch(`https://kata.academy:8021/api/articles/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${document.cookie.split(' ')[0].slice(5)}` },
        body: JSON.stringify({
          article: {
            title,
            description,
            body,
            tagList: Object.values(tags.current),
          },
        }),
      });
      console.log(res);
      if (!res.ok) {
        throw new Error(`Could not fetch articles , received ${res.status}`);
      }
      const result = await res.json();
      console.log(result);
      navigate('/');
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  };
  function createTag(id, val) {
    return (
      <li key={id} className="creat-article__block__tag">
        <input
          type="text"
          value={val}
          className="form form-tags"
          onChange={(event) => { tags.current[id] = event.target.value; }}
          placeholder="Tags"
        />
        <button
          className="creat-article__tags__delete-button"
          type="button"
          onClick={() => setArrTags((prevArr) => {
            const idx = prevArr.findIndex((el) => +el.key === id);
            prevArr.splice(idx, 1);
            delete tags.current[id];
            return [...prevArr];
          })}
        >
          Delete
        </button>
      </li>
    );
  }

  useEffect(() => {
    console.log('gbgfbgf');
    setTitle(page.title);
    setDescription(page.description);
    setBody(page.body);
    if (Object.keys(page).length && page.tagList.length && !arrTags.length) {
      setArrTags(page.tagList.map((el) => {
        tagId += 1;
        tags.current[tagId] = el;
        return createTag(tagId, el);
      }));
    }
  }, [Object.keys(page).length]);

  return (
    <form className="creat-article__block" onSubmit={formSubmit}>
      <p className="creat-article__block__header">Edit article</p>
      <label className="creat-article__block__form">
        <p>Title</p>
        <input
          type="text"
          className="form"
          value={title || ''}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
        />
      </label>
      <label className="creat-article__block__form">
        <p>Short description</p>
        <input
          type="text"
          className="form"
          value={description || ''}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description"
        />
      </label>
      <label className="creat-article__block__form">
        <p>Text</p>
        <textarea
          type="text"
          className="form form-textarea"
          value={body || ''}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Text"
        />
      </label>
      <p className="creat-article__header__tags">Tags</p>
      <ul className="creat-article__block__form creat-article__block__tags">
        {arrTags}
        <button
          className="creat-article__tags__add-button"
          type="button"
          onClick={() => setArrTags((prevArr) => {
            tagId += 1;
            console.log(prevArr);
            prevArr.push(createTag(tagId));
            return [...prevArr];
          })}
        >
          Add tag
        </button>
      </ul>
      <button className="creat-article__block__button" type="submit">Send</button>
    </form>
  );
}

export default EditArticle;
