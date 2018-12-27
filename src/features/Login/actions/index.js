import { pick } from 'ramda';
import {
    login as loginAPI,
    users as usersAPI
} from '../api';
import {
    login as loginConstants,
    createUser as createUserConstants
} from '../constants';
import { history } from '../../../utils/app';
import request from '../../../utils/request';
import { createAction } from '../../../utils/app';
import { setItem } from '../../../utils/localstorage';

const actions = {
    login: {
        request: () => createAction(loginConstants.REQUEST),
        success: res => createAction(loginConstants.SUCCESS, res),
        failure: err => createAction(loginConstants.FAILURE, err),
    },
    createUser: {
        request: () => createAction(createUserConstants.REQUEST),
        success: res => createAction(createUserConstants.SUCCESS, res),
        failure: err => createAction(createUserConstants.FAILURE, err),
    }
};

export const login = (params) => dispatch => {
    dispatch(actions.login.request());
    request.post(loginAPI(), pick(['login', 'password'], params))
        .then(({ data }) => {
            setItem({ key: 'USER_ID', value: data });
            setItem({ key: 'USER_LOGIN', value: params.login });
            history.push('/board');
            return dispatch(actions.login.success(data))
        })
        .catch(err => dispatch(actions.login.failure(err)));
};

export const createUser = (params, errorCallback) => dispatch => {
    dispatch(actions.createUser.request());
    return request.post(usersAPI(), pick(['login', 'password'], params))
        .then(({ data }) => {
            setItem({ key: 'USER_ID', value: data });
            setItem({ key: 'USER_LOGIN', value: params.login });
            history.push('/board');
            dispatch(actions.createUser.success(data));
        })
        .catch(err => {
            errorCallback(err);
            dispatch(actions.createUser.failure(err));
        });
};