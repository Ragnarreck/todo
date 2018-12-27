export const notesAPI = (userId, date, group) => {
    const dateQuery = date ? `/${date}` : '';
    const groupQuery = group ? `/${group}` : '';
    return `/notes/user/${userId}${dateQuery}${groupQuery}`;
};

export const noteAPI = id => `/note${id ? `/${id}` : ''}`;

