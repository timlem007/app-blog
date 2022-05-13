const initialState = {
  loading: false,
  articlesList: [],
  articlesCount: 1,
  page: {},
  authenticationInfo: 'null',
  isAuthentication: document.cookie.split(' ')[0].slice(5),
};

// eslint-disable-next-line
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING':
      // console.log(state.loading);
      return { ...state, loading: !state.loading };
    case 'GET_ATICLES': return { ...state, listInfo: { ...action.payload } };
    case 'GET_PAGE': return { ...state, page: action.payload };
    // case 'CLEARE_PAGE': return { ...state, page: {} };
    case 'CHANGE_LIST_INFO':
      return {
        ...state,
        articlesList: action.payload.articles,
        articlesCount: action.payload.articlesCount,
      };
    case 'POST_NEW_USERS':
      console.log(action.userInfo, state.authenticationInfo);
      if (!action.userInfo) {
        return { ...state, authenticationInfo: {} };
      }
      return {
        ...state,
        authenticationInfo: { ...action.userInfo.user },
      };
    case 'AUTHENTICATION':
      console.log(action.userInfo, state.authenticationInfo, action.userInfo.user.token);
      document.cookie = `user=${action.userInfo.user.token}`;
      return {
        ...state,
        authenticationInfo: { ...action.userInfo },
        isAuthentication: document.cookie.split(' ')[0].slice(5),
      };

    case 'UPDATE_USER_INFO':
      console.log(action.userInfo, state.authenticationInfo, action.userInfo.user.token);
      document.cookie = `user=${action.userInfo.user.token}`;
      return {
        ...state,
        authenticationInfo: { ...action.userInfo },
        isAuthentication: document.cookie.split(' ')[0].slice(5),
      };

    case 'HAVE_AUTHENTICATION':
      console.log(action.authenticationInfo);
      return { ...state, authenticationInfo: action.authenticationInfo };

    case 'CHANGE_LIKE': {
      const newArticlesList = [...state.articlesList];
      const idx = state.newArticlesList
        ?.findIndex((el) => el.slug === action.userInfo.article.slug);
      newArticlesList[idx] = action.userInfo.article;
      return { ...state, page: { ...action.userInfo.article }, articlesList: newArticlesList };
    }

    case 'LOG_OUT':
      return { ...state, isAuthentication: 'null', authenticationInfo: 'null' };
    default:
      return state;
  }
};

export default reducer;
