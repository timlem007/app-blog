import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
// import { updateUser } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import './Create-article.scss';

let tagId = 0;
function CreatArticle() {
  const {
    // register,
    // reset,
    formState: {
      // errors,
      isValid,
    },
    // handleSubmit,
  } = useForm({ mode: 'onChange' });
  const [arrTags, setArrTags] = useState([]);
  //   const dispatch = useDispatch();
  const navigate = useNavigate();
  const title = useRef();
  const description = useRef();
  const text = useRef();
  const tags = useRef({});
  console.log(Object.values(tags.current).join(', '));
  const formSubmit = async (event) => {
    event.preventDefault();
    console.log(title.current, description.current, text.current, tags.current);
    // dispatch(updateUser(name.current, email.current, password.current, imageURL.current));
    try {
      const res = await fetch('https://kata.academy:8021/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${document.cookie.split(' ')[0].slice(5)}` },
        body: JSON.stringify({
          article: {
            title: title.current,
            description: description.current,
            body: text.current,
            tagList: Object.values(tags.current),
          },
        }),
      });
      if (!res.ok) {
        throw new Error(`Could not fetch articles , received ${res.status}`);
      }
      const result = await res.json();
      navigate('/');
      console.log(result);
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  };
  function createTag(id) {
    return (
      <li key={id} className="creat-article__block__tag">
        <input
          type="text"
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

  return (
    <form className="creat-article__block" onSubmit={formSubmit}>
      <p className="creat-article__block__header">Create new article</p>
      <label className="creat-article__block__form">
        <p>Title</p>
        <input
          type="text"
          className="form"
          onChange={(event) => { title.current = event.target.value; }}
          placeholder="Title"
        />
      </label>
      <label className="creat-article__block__form">
        <p>Short description</p>
        <input
          type="text"
          className="form"
          onChange={(event) => { description.current = event.target.value; }}
          placeholder="Description"
        />
      </label>
      <label className="creat-article__block__form">
        <p>Text</p>
        <textarea
          type="text"
          className="form form-textarea"
          onChange={(event) => { text.current = event.target.value; }}
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
            prevArr.push(createTag(tagId));
            return [...prevArr];
          })}
        >
          Add tag
        </button>
      </ul>
      <button disabled={!isValid} className="creat-article__block__button" type="submit">Send</button>
    </form>
  );
}

export default CreatArticle;
