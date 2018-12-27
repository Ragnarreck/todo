import { createAsync } from '../../../utils/app';

export const getNotes = createAsync('GET_NOTES');

export const createNote = createAsync('CREATE_NOTE');

export const updateNote = createAsync('UPDATE_NOTE');

export const removeNote = createAsync('REMOVE_NOTE');