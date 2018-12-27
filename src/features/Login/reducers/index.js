import { login } from "../constants";
import { createReducer } from "../../../utils/app";

const initialState = {
    user: null,
    isLoading: false,
};

const reducersObject = {
    [login.REQUEST]: state => ({ state, isLoading: true }),
    [login.SUCCESS]: (state, { payload }) => ({ user: payload, isLoading: false }),
    [login.FAILURE]: state => ({ ...state, isLoading: false })
};

export const reducers = createReducer(initialState, reducersObject);