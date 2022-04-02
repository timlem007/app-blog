const initialState = {
  loading: false,
  articlesList: [],
  articlesCount: 0,
  page: {},
};

// eslint-disable-next-line
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING':
      console.log(state.loading);
      return { ...state, loading: !state.loading };
    case 'GET_ATICLES': return { ...state, listInfo: action.payload };
    case 'GET_PAGE': return { ...state, page: action.payload };
    case 'CLEARE_PAGE': return { ...state, page: {} };
    case 'CHANGE_LIST_INFO':
      return {
        ...state,
        articlesList: action.payload.articles,
        articlesCount: action.payload.articlesCount,
      };
    default:
      return state;
  }
};

export default reducer;
