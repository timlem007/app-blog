// export const tabChange = (activeKey) => ({ type: 'TAB_CHANGE', activeKey });
// export const getTickets = (tickets) => ({ type: 'TICKETS', tickets });
// export const addTickets = () => ({ type: 'ADD_TICKETS' });

export const loading = () => ({ type: 'LOADING' });
export const changeListInfo = (listInfo) => ({
  type: 'CHANGE_LIST_INFO',
  payload: listInfo,
});
export const getPage = (page) => ({
  type: 'GET_PAGE',
  payload: page.article,
});
export const haveFetch = (url, to) => async (dispatch) => {
  try {
    dispatch(loading());
    const res = await fetch(`https://kata.academy:8021/api/${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url} , received ${res.status}`);
    }
    dispatch(to(await res.json()));
    dispatch(loading());
  } catch {
    throw new Error();
  }
};
export const getAticles = (number = 0) => async (dispatch) => {
  dispatch(haveFetch(`articles?limit=5&offset=${number}`, changeListInfo));
};
export const getAticlesSlug = (slug = '') => async (dispatch) => {
  console.log('fdvfdv');
  dispatch(haveFetch(`articles/${slug}`, getPage));
};
export const cleareAticlesSlug = () => ({ type: 'CLEARE_PAGE' });
// export const getAticles = () => ({ type: 'GET_ATICLES', payload: listInfo });
// ({ type: 'GET_ATICLES' });
export const getToken = () => ({ type: 'GET_TOKEN' });
