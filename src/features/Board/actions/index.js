import moment from 'moment';
import { noteAPI, notesAPI } from '../api';
import request from '../../../utils/request';
import { createAction } from '../../../utils/app';
import {
    getNotes as getNotesConstants,
    createNote as createNoteConstants,
    updateNote as updateNoteConstants,
    removeNote as removeNoteConstants
} from '../constants';
import { getItem } from '../../../utils/localstorage';

const actions = {
    getNotes: {
        request: () => createAction(getNotesConstants.REQUEST),
        success: res => createAction(getNotesConstants.SUCCESS, res),
        failure: err => createAction(getNotesConstants.FAILURE, err),
    },
    createNote: {
        request: () => createAction(createNoteConstants.REQUEST),
        success: res => createAction(createNoteConstants.SUCCESS, res),
        failure: err => createAction(createNoteConstants.FAILURE, err),
    },
    updateNote: {
        request: () => createAction(updateNoteConstants.REQUEST),
        success: res => createAction(updateNoteConstants.SUCCESS, res),
        failure: err => createAction(updateNoteConstants.FAILURE, err),
    },
    removeNote: {
        request: () => createAction(removeNoteConstants.REQUEST),
        success: res => createAction(removeNoteConstants.SUCCESS, res),
        failure: err => createAction(removeNoteConstants.FAILURE, err),
    }
};

export const getNotes = ({ userId, date, group }) => dispatch => {
    dispatch(actions.getNotes.request());
    request.get(notesAPI(userId, date, group))
        .then(({ data }) => dispatch(actions.getNotes.success(data)))
        .catch(err => dispatch(actions.getNotes.failure(err)));
};

export const createNote = ({ description, group, title }) => dispatch => {
    const creatorId = getItem('USER_ID');
    const date = moment().format('DD-MM-YYYY');
    dispatch(actions.createNote.request());
    request.post(noteAPI(), { description, group, creatorId, date, title })
        .then(({ data }) => dispatch(actions.createNote.success(data)))
        .catch(err => dispatch(actions.createNote.failure(err)));
};

export const updateNote = (note) => dispatch => {
    dispatch(actions.updateNote.request());
    request.put(noteAPI(note._id), note)
        .then(({ data }) => dispatch(actions.updateNote.success(data)))
        .catch(err => dispatch(actions.updateNote.failure(err)));
};

export const removeNote = id => dispatch => {
    dispatch(actions.removeNote.request());
    request.delete(noteAPI(id))
        .then(({ data }) => dispatch(actions.removeNote.success(data)))
        .catch(err => dispatch(actions.removeNote.failure(err)));
};