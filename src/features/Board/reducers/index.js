import { getNotes, createNote, updateNote, removeNote } from '../constants';
import { createReducer } from '../../../utils/app';

const initialState = {
    notes: [],
    isLoading: false,
};

const getNotesReducer = {
    [getNotes.REQUEST]: state => ({ ...state, isLoading: true }),
    [getNotes.SUCCESS]: (state, { payload }) => ({ notes: payload, isLoading: false }),
    [getNotes.FAILURE]: state => ({ ...state, isLoading: false })
};

const createNoteReducer = {
    [createNote.REQUEST]: state => ({ ...state, isLoading: true }),
    [createNote.SUCCESS]: (state, { payload }) => ({
        isLoading: false,
        notes: [...state.notes, payload],
    }),
    [createNote.FAILURE]: state => ({ ...state, isLoading: false })
};

const updateNoteReducer = {
    [updateNote.REQUEST]: state => ({ ...state, isLoading: true }),
    [updateNote.SUCCESS]: (state, { payload }) => ({
        isLoading: false,
        notes: state.notes.map(item => item._id === payload._id
            ? payload
            : item),
    }),
    [updateNote.FAILURE]: state => ({ ...state, isLoading: false })
};

const removeNoteReducer = {
    [removeNote.REQUEST]: state => ({ ...state, isLoading: true }),
    [removeNote.SUCCESS]: (state, { payload }) => ({
        isLoading: false,
        notes: state.notes.filter(item => item._id !== payload),
    }),
    [removeNote.FAILURE]: state => ({ ...state, isLoading: false })
};

const reducersObject = Object.assign({}, getNotesReducer, createNoteReducer, updateNoteReducer, removeNoteReducer);

export const reducers = createReducer(initialState, reducersObject);