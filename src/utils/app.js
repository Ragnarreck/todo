import createHistory from 'history/createBrowserHistory';

const asyncActions = ['REQUEST', 'SUCCESS', 'FAILURE'];

export const createAsync = action => asyncActions.reduce((acc, item) => ({
    ...acc,
    [item]: `${item}_${action}`
}), {});

export const createAction = (type, payload) => ({ type, payload });

export const createReducer = (initialState, actionHandlers) => (state = initialState, action) => {
    const handler = actionHandlers[action.type];
    return handler ? handler(state, action) : state;
};

export const history = createHistory({ forceRefresh: true });