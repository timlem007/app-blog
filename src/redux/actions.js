// export const tabChange = (activeKey) => ({ type: 'TAB_CHANGE', activeKey });
// export const getTickets = (tickets) => ({ type: 'TICKETS', tickets });
// export const addTickets = () => ({ type: 'ADD_TICKETS' });
const URL = 'https://kata.academy:8021/api/';

export const loading = () => ({ type: 'LOADING' });

export const haveFetch = (url, to) => async (dispatch) => {
  try {
    dispatch(loading());
    const res = await fetch(`https://kata.academy:8021/api/${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url} , received ${res.status}`);
    }
    const result = await res.json();
    console.log(result);
    dispatch(to(result));
    dispatch(loading());
  } catch (err) {
    console.log(err);
    throw new Error();
  }
};

export const havePostFetch = (url, to, requestBody) => async (dispatch) => {
  try {
    const res = await fetch(`https://kata.academy:8021/api/${url}`, requestBody);
    if (!res.ok) {
      console.log(res);
      throw new Error(`Could not fetch ${url} , received ${res.status}`);
    }
    const result = await res.json();
    console.log(result);
    dispatch(to(result));
  } catch (err) {
    console.log(err);
    throw new Error();
  }
};

export const changeListInfo = (listInfo) => ({
  type: 'CHANGE_LIST_INFO',
  payload: listInfo,
});
export const getAticles = (number = 0) => async (dispatch) => {
  dispatch(haveFetch(`articles?limit=5&offset=${number}`, changeListInfo));
};

export const getPage = (page) => ({
  type: 'GET_PAGE',
  payload: page.article,
});
export const getAticlesSlug = (slug = '') => async (dispatch) => {
  dispatch(haveFetch(`articles/${slug}`, getPage));
};

export const createNewUsers = (userInfo) => ({
  type: 'POST_NEW_USERS',
  userInfo,
});
export const postNewUsers = (username, email, password) => async (dispatch) => {
  console.log('postNewUsers');
  dispatch(havePostFetch('users', createNewUsers, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: { username, email, password } }),
  }));
};

export const singInUser = (userInfo) => ({
  type: 'AUTHENTICATION',
  userInfo,
});
export const singIn = (email, password) => async (dispatch) => {
  console.log('loginUser');
  dispatch(havePostFetch('users/login', singInUser, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: { email, password } }),
  }));
};

export const haveUserAuthentication = (authenticationInfo) => ({
  type: 'HAVE_AUTHENTICATION',
  authenticationInfo,
});

export const logOut = () => ({ type: 'LOG_OUT' });

export const updateUserInfo = (userInfo) => ({
  type: 'UPDATE_USER_INFO',
  userInfo,
});
export const updateUser = (username, email, password, image) => async (dispatch) => {
  console.log('updateUser', document.cookie.split(' ')[0].slice(5), document.cookie);
  dispatch(havePostFetch('user', updateUserInfo, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${document.cookie.split(' ')[0].slice(5)}` },
    body: JSON.stringify({
      user: {
        username, email, password, image,
      },
    }),
  }));
};

export const changeLike = (userInfo) => ({
  type: 'CHANGE_LIKE',
  userInfo,
});

export const likes = (slug, method) => async (dispatch) => {
  console.log(method);
  dispatch(havePostFetch(`articles/${slug}/favorite`, changeLike, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${document.cookie.split(' ')[0].slice(5)}` },
  }));
};

export const getAuthenticationUserInfo = () => async (dispatch) => {
  try {
    const res = await fetch(`${URL}user`, {
      // method: 'GET',
      headers: { Authorization: `Bearer ${document.cookie.split(' ')[0].slice(5)}` },
      // body: JSON.stringify({
      //   user: { token: document.cookie.split(' ')[0].slice(5) },
      // }),
    });
    switch (res.status) {
      case 422: throw new Error(`Could not fetch ${URL}user, received 422`);
      // case 401: return dispatch(haveUserAuthentication(null));
      case 200: return dispatch(haveUserAuthentication(await res.json()));
      default: return null;
    }
  } catch (err) {
    console.log(err);
    throw new Error();
  }
};

export const putAuthenticationUserInfo = () => async (dispatch) => {
  try {
    const res = await fetch(`${URL}user`);
    switch (res.status) {
      case 422: throw new Error(`Could not fetch ${URL}user, received 422`);
      case 401: return dispatch(haveUserAuthentication(null));
      case 200: return dispatch(haveUserAuthentication(await res.json()));
      default: return dispatch(haveUserAuthentication(null));
    }
  } catch (err) {
    console.log(err);
    throw new Error();
  }
};

// export const cleareAticlesSlug = () => ({ type: 'CLEARE_PAGE' });

// export const getAticles = () => ({ type: 'GET_ATICLES', payload: listInfo });
// ({ type: 'GET_ATICLES' });
export const getToken = () => ({ type: 'GET_TOKEN' });
